import React, { useContext, useRef } from "react";
import Image from "next/image";

import { auth, db } from "../firebase/clientApp";
import { collection, addDoc, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import AuthRoute from "../HOC/authRoute";

import { AuthContext } from "../context/AuthContext";
import Link from "next/link";

import NavBar from "../components/navBar";
import HouseholdCard from "../components/householdCard";
import NewHouseForm from "../components/newHouseForm";
import UserInvites from "../components/userInvites/userInvites";

function Index() {
  const appContext = useContext(AuthContext);
  const userData = appContext?.userData;
  const [value, loading, error] = useCollection(
    query(
      collection(db, "household"),
      where("users", "array-contains", userData?.userId ?? null)
    )
  );

  const modalCheckboxRef = useRef<HTMLInputElement>(null);

  // Need to refernce input newHouse modal to close the model on submit

  const handleCreateHousehold = async (event: any) => {
    event.preventDefault();
    const houseName = event.target.elements.houseName;
    const houseDesc = event.target.elements.houseDesc;

    const docRef = await addDoc(collection(db, "household"), {
      name: houseName.value,
      desc: houseDesc.value,
      users: [userData?.userId], //need to change this bit to match the form inputs
    });

    if (modalCheckboxRef.current !== null) {
      modalCheckboxRef.current.checked = !modalCheckboxRef.current.checked;
    }
  };

  return (
    <AuthRoute>
      <NavBar></NavBar>
      <div className="flex flex-row max-h-screen min-w-full place-content-center gap-5 px-5 py-5 w-max mx-auto">
        <div className="w-fit">Recent Activity Goes Here</div>
        <div className="w-fit place-item-center mx-auto flex flex-col items-center">
          <h1 className="text-6xl text-center font-black mb-10">Your Homes</h1>
          <div className="overflow-auto container h-1/2 shadow-md rounded-md">
            <p>
              {error && <strong>Error: {JSON.stringify(error)}</strong>}
              {loading && <span>Collection: Loading...</span>}
              {value && (
                <div className="flex flex-col justify-around items-center">
                  {value.docs.map((doc) => (
                    <HouseholdCard
                      desc={doc.data().desc}
                      id={doc.id}
                      key={doc.id}
                      name={doc.data().name}
                    />
                  ))}
                </div>
              )}
            </p>
          </div>
          <label
            htmlFor="new-house-modal"
            className="btn btn-wide modal-button mt-10"
          >
            + Add a new Household
          </label>
          {/* <HouseholdCard icon="/plus.png" desc="Add a new household" id="" name="New House"/> */}
        </div>
        <div className="w-fit flex-col" id="userInvites">
          <UserInvites />
          <div className="mt-4 flex flex-col gap-y-2">
            <div className="flex gap-x-3 items-center justify-center">
              <h4>Authentication method:</h4>
              <h6>{userData?.userProviderId}</h6>
            </div>
            <div className="flex gap-x-3 items-center justify-center">
              <h4>userId:</h4>
              <h6>{userData?.userId}</h6>
            </div>
            <div className="flex gap-x-3 items-center justify-center">
              <h4>display name:</h4>
              <h6>{userData?.userName || "null"}</h6>
            </div>
            <div className="flex gap-x-3 items-center justify-center">
              <h4>email:</h4>
              <h6>{userData?.userEmail}</h6>
            </div>
            <div className="flex gap-x-3 items-center justify-center">
              <h4>Profile picture</h4>
              {userData?.userPhotoLink ? (
                <Image
                  className="rounded-full object-contain w-32 h-32"
                  src={userData?.userPhotoLink}
                  alt={userData?.userName ?? ""}
                  width="32"
                  height="32"
                />
              ) : (
                "null"
              )}
            </div>
          </div>
        </div>
      </div>

      <input
        type="checkbox"
        id="new-house-modal"
        ref={modalCheckboxRef}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="new-house-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Add a new Household</h3>
          <p className="py-4">Enter the details of your new home below.</p>
          <NewHouseForm handleClick={handleCreateHousehold} />
        </div>
      </div>
    </AuthRoute>
  );
}

export default Index;
