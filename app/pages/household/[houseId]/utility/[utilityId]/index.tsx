import React, { useContext, useRef } from "react";

import { AuthContext } from "../../../../../context/AuthContext";
import { useRouter } from "next/router";

import {
  getDoc,
  addDoc,
  doc,
  collection,
  Timestamp,
  where,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../../firebase/clientApp";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { DocumentData } from "@google-cloud/firestore";
import NavBar from "../../../../../components/navBar";
import UtilityBookingForm from "../../../../../components/utilityBookingForm";
import UtilityCalendar from "../../../../../components/utilityCalendar";

const Login = () => {
  const router = useRouter();
  const { houseId, utilityId }: any = router.query;
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.userData;
  const householdRef = doc(db, "household", houseId);
  const amenityRef = doc(householdRef, "amenity", utilityId);
  const [value, loading, error, snapshot] = useDocumentData(amenityRef);

  const handleBooking = async (amenityId: string) => {
    const bookingRef = collection(db, "booking");
    const docRef = await addDoc(bookingRef, {
      amenityId,
      userId: currentUser?.userId,
      householdId: houseId,
      from: Timestamp.now(),
      to: Timestamp.now(),
    });
    const updateAmenity = await updateDoc(
      doc(householdRef, "amenity", amenityId),
      {
        "latestBooking.from": Timestamp.now(),
        "latestBooking.to": Timestamp.now(),
        "latestBooking.userId": currentUser?.userId,
      }
    );

    console.log("Document written with ID: ", docRef.id);
  };

  const isAmenityBooked = (data: DocumentData): boolean => {
    const now = new Date();
    const booking = data?.latestBooking?.to.toDate();
    console.log("day now", data?.name, now.getDay(), booking?.getDay());
    if (now.getDay() == booking?.getDay()) {
      return true;
    }

    return false;
  };

  return (
    <>
      <NavBar></NavBar>
      <div className="flex flex-row justify-center items-center">
        <h1 className="text-center font-black text-8xl mb-2">{value?.type}</h1>
        <h1 className="text-center font-black text-2xl mb-2 mr-1">
          {value?.name}
        </h1>
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
              <a className="text-red-500">
                Delete
                <span className="badge badge-error">!</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center ">
        <h2 className="text-lg text-center font-semibold text-bo">
          Description
        </h2>
        <p className="text-center mb-8">{value?.desc ?? "No Description"}</p>
        <label
          htmlFor="new-booking-modal"
          className="btn btn-wide btn-primary modal-button mb-4"
        >
          Book
        </label>
        <input
          type="checkbox"
          id="new-booking-modal"
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="new-booking-modal"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold">Create a new booking</h3>
            <p className="py-4">Enter the details of your new booking below.</p>
            <UtilityBookingForm
              handleSubmit={handleBooking}
            ></UtilityBookingForm>
          </div>
        </div>
      </div>
      <UtilityCalendar
        houseId={houseId}
        utilityId={utilityId}
      ></UtilityCalendar>
    </>
  );
};

export default Login;
