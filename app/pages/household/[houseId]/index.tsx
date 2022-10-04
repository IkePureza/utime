import React, { useContext, useRef } from "react";

import { AuthContext } from "../../../context/AuthContext";
import { useRouter } from "next/router";

import {
  addDoc,
  deleteDoc,
  doc,
  collection,
  where,
  query,
} from "firebase/firestore";
import { db } from "../../../firebase/clientApp";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import NavBar from "../../../components/navBar";
import UtilityCard from "../../../components/utilityCard";
import NewUtilityForm from "../../../components/newUtilityForm";
import DeleteHouseForm from "../../../components/deleteHouseForm";

const Login = () => {
  const router = useRouter();
  const { houseId }: any = router.query;
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.userData;
  const householdRef = doc(db, "household", houseId);
  const amenityRef = collection(householdRef, "amenity");
  const bookingsRef = collection(db, "booking");

  const modalCheckboxRef = useRef<HTMLInputElement>(null);

  const [value, loading, error] = useDocument(householdRef);
  const [bookingValue, bookingLoading, bookingError] = useCollection(
    query(bookingsRef, where("householdId", "==", houseId))
  );
  const [amenityValue, amenityLoading, amenityError] =
    useCollection(amenityRef);

  const handleCreateAmenity = async (event: any) => {
    event.preventDefault();
    const { name, type, desc } = event.target.elements;
    const amenityRef = collection(householdRef, "amenity");
    const docRef = await addDoc(amenityRef, {
      name: name.value,
      type: type.value,
      desc: desc.value,
    });
    if (modalCheckboxRef.current !== null) {
      modalCheckboxRef.current.checked = !modalCheckboxRef.current.checked;
    }
    console.log("Document written with ID: ", docRef.id);
  };

  const handleDeleteHouse = async (event: any) => {
    event.preventDefault();

    const docRef = await deleteDoc(doc(db, "household", householdRef.id));

    if (modalCheckboxRef.current !== null) {
      modalCheckboxRef.current.checked = !modalCheckboxRef.current.checked;
    }
    console.log("House deleted");
  };

  return (
    <>
      <NavBar></NavBar>
      <div className="flex flex-row max-h-screen min-w-full px-5 py-5 w-max mx-auto">
        <div className="flex flex-col basis-1/4 items-center justify-start">
          <h1 className="text-center font-black text-2xl mb-2">Utilities</h1>
          <div className="flex flex-col gap-y-3 w-full">
            {amenityError && (
              <strong>Error: {JSON.stringify(amenityError)}</strong>
            )}
            {amenityLoading && <span>Collection: Loading...</span>}
            {amenityValue && (
              <div className="flex flex-col justify-around items-center">
                {amenityValue.docs.map((doc) => (
                  <UtilityCard
                    id={doc.id}
                    houseId={houseId}
                    key={doc.id}
                    data={doc.data()}
                  ></UtilityCard>
                ))}
              </div>
            )}
          </div>
          <label
            htmlFor="new-utility-modal"
            className="btn btn-wide btn-primary modal-button mb-4"
          >
            + Add a new Utility
          </label>
          <input
            type="checkbox"
            id="new-utility-modal"
            ref={modalCheckboxRef}
            className="modal-toggle"
          />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="new-utility-modal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <h3 className="text-lg font-bold">Add a new utility</h3>
              <p className="py-4">
                Enter the details of your new utility below.
              </p>
              <NewUtilityForm handleSubmit={handleCreateAmenity} />
            </div>
          </div>
        </div>
        <div className="basis-1/2">
          <h1 className="text-center font-black text-3xl mb-2">
            {" "}
            Household {value?.data()?.name}
          </h1>
        </div>
        <div className="dropdown dropdown-right">
          <label tabIndex={0} className="btn btn-circle btn-ghost btn-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">Edit</a>
            </li>
            <li>
              <label htmlFor="delete-house-modal" className="text-red-500">
                Delete
              </label>
            </li>
          </ul>
        </div>
        <input
          type="checkbox"
          id="delete-house-modal"
          ref={modalCheckboxRef}
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="delete-house-modal"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold">
              Are you sure you want to delete the house?
            </h3>
            <p className="py-4">
              This action will delete the house for all users.
            </p>
            <DeleteHouseForm handleClick={handleDeleteHouse} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
