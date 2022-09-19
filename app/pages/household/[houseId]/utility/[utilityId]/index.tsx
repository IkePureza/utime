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
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";
import Link from "next/link";
import { DocumentData, DocumentReference } from "@google-cloud/firestore";
import NavBar from "../../../../../components/navBar";
import UtilityBookingForm from "../../../../../components/utilityBookingForm";

const Login = () => {
  const router = useRouter();
  const { houseId, utilityId }: any = router.query;
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.userData;
  const householdRef = doc(db, "household", houseId);
  const amenityRef = doc(householdRef, "amenity", utilityId);
  const [amenityData, loading, error, snapshot] = useDocumentData(amenityRef);

  const handleBooking = async (event: any) => {
    event.preventDefault();
    const bookingDesc = event.target.elements.desc.value;
    const bookingTo = event.target.elements.to.value;
    const bookingFrom = event.target.elements.from.value;

    const bookingRef = collection(db, "booking");

    // Call checks here

    console.log(bookingDesc, bookingTo, bookingFrom);

    const docRef = await addDoc(bookingRef, {
      utilityId,
      desc: bookingDesc,
      userId: currentUser?.userId,
      householdId: houseId,
      from: bookingFrom, //
      to: bookingTo,
    });

    const updateAmenity = await updateDoc(amenityRef, {
      "latestBooking.from": bookingFrom,
      "latestBooking.to": bookingTo,
      "latestBooking.userId": currentUser?.userId,
      "latestBooking.bookingID": docRef.id,
    });

    // console.log("Document wbookingFromritten with ID: ", docRef.id);
  };

  // Checks if utility is currently booked
  // Current booking date is equal or less to the latest booking toDate
  // const isAmenityBooked = (bookingFrom: any, bookingTo: any, amenityData: DocumentData): boolean => {

  //   // get latestBookingFrom and latestBookingTo from UtilityID
  //   const LBFrom = new Date(amenityData.latestBooking.from);
  //   const LBTo = new Date(amenityData.latestBooking.to);

  //   if (bookingFrom < LBFrom){
  //     return false;
  //   }

  //   if (bookingFrom){

  //   }

  //   if (currBooking.getDay() <= booking?.getDay()) {
  //     return true;
  //   }
  //   return false;
  // };

  // 1. Check if theres clash in bookings
  //  - Current booking is not within the latest known booking

  //  2. Check the booking dates make sense
  //  - From > RN (Can't book in the past)
  //  - From-date can't be < to-date
  // const datesWellFormed = (data: DocumentData): boolean => {
  //   const now = new Date();

  // };

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
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-lg text-2xl text-center text-bo">Description</h2>
        <p className="text-center mb-8">{value?.desc ?? "No Description"}</p>
        <UtilityBookingForm handleSubmit={handleBooking}></UtilityBookingForm>
      </div>
    </>
  );
};

export default Login;
