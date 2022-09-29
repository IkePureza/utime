import React, { useContext, useRef, useState, useEffect } from "react";

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
  const [validBooking, setValidity] = useState(-1);
  const [bookingData, setBookingData] = useState({
    bookingDesc: undefined,
    bookingTo: undefined,
    bookingFrom: undefined,
  });
  const bookingRef = collection(db, "booking");

  useEffect(() => {
    if (amenityData) {
      // Checks if amenity is already booked
      var utilityAvail = isUtilityAvail(
        bookingData.bookingFrom,
        bookingData.bookingTo
        // amenityData
      );

      // Checks if user is booking into the past
      var bookingMakesSense = datesWellFormed(
        bookingData.bookingFrom,
        bookingData.bookingTo
      );
      console.log("Are the dates well formed?:", bookingMakesSense);
      console.log("Is current utility available? ", utilityAvail);

      // If booking dont make sense OR its unavailable
      if (bookingMakesSense == false || utilityAvail == false) {
        setValidity(0);
        console.log("BOOKING INVALID");
      }
    }
  }, [bookingData]); // Unsure what to do with this

  const handleBooking = async (event: any) => {
    // Prevents page from auto reloading every form submit
    event.preventDefault();

    const bookingDesc = event.target.elements.desc.value;
    const bookingTo = event.target.elements.to.value;
    const bookingFrom = event.target.elements.from.value;
    setBookingData({ bookingDesc, bookingTo, bookingFrom });

    if (amenityData) {
      // Checks if amenity is already booked
      var utilityAvail = isUtilityAvail(
        bookingFrom,
        bookingTo
        // amenityData
      );
      // Checks if user is booking into the past
      var bookingMakesSense = datesWellFormed(bookingFrom, bookingTo);

      console.log("UTIL AVAIL?", utilityAvail);
      console.log("BOOKING GOOD?", bookingMakesSense);

      // Do below if ((bookingMakesSense && alreadyBooked) == true)
      if (bookingMakesSense == true && utilityAvail == true) {
        console.log("HELLO WORLDDDDDDD");
        const docRef = await addDoc(bookingRef, {
          utilityId,
          desc: bookingDesc,
          userId: currentUser?.userId,
          householdId: houseId,
          from: bookingFrom,
          to: bookingTo,
        });

        const updateAmenity = await updateDoc(amenityRef, {
          "latestBooking.from": bookingFrom,
          "latestBooking.to": bookingTo,
          "latestBooking.userId": currentUser?.userId,
          "latestBooking.bookingID": docRef.id,
        });
        setValidity(1);

        // ToDo:
        // 1. Change last booking system to an array of bookings?
        //    Will have to further check validity in a loop maybe
        // 2. Implement delete booking feature
      }
    }
    // console.log("Document wbookingFromritten with ID: ", docRef.id);
  };

  // Checks if utility is currently booked
  // Returns true if utility is available
  // Current booking date is equal or less to the latest booking toDate
  const isUtilityAvail = (
    bookingFrom: any,
    bookingTo: any
    // amenityData: DocumentData
  ): boolean => {
    // if amenityData is undefined (no amenity?) then return true as no prev booking
    if (
      amenityData == undefined ||
      bookingFrom == undefined ||
      bookingTo == undefined ||
      amenityData?.latestBooking == undefined
    ) {
      return true;
    }

    // get latestBookingFrom and latestBookingTo from UtilityID
    // latestBooking now only has name, desc, type
    const LBFrom = new Date(amenityData?.latestBooking.from);
    const LBTo = new Date(amenityData?.latestBooking.to);
    const BFrom = new Date(bookingFrom);
    const BTo = new Date(bookingTo);

    // Checks
    console.log("LastBookingFrom:", LBFrom);
    console.log("LastBookingTo", LBTo);
    console.log("BookingFrom:", BFrom);
    console.log("BookingTo:", BTo);

    // If booking from is after last booking to
    if (BFrom > LBTo) {
      return true;
    }

    // If booking to is before last booking from
    if (BTo < LBFrom) {
      return true;
    }

    // Else anything else return false
    return false;
  };

  //  Check the booking dates make sense
  //  - BFrom > RN (Can't book in the past)
  //  - From-date can't be < to-date
  const datesWellFormed = (bookingFrom: any, bookingTo: any): boolean => {
    const now = new Date(Date.now());
    const BFrom = new Date(bookingFrom);
    const BTo = new Date(bookingTo);

    if ((bookingFrom || bookingTo) == undefined) {
      return true;
    }

    if (BFrom > now) {
      return true;
    }

    console.log("User is trying to book into the past");
    return false;
  };

  return (
    <>
      <NavBar></NavBar>
      <div className="flex flex-row justify-center items-center">
        <h1 className="text-center font-black text-8xl mb-2">
          {amenityData?.type}
        </h1>
        <h1 className="text-center font-black text-2xl mb-2 mr-1">
          {amenityData?.name}
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
        <p className="text-center mb-8">
          {amenityData?.desc ?? "No Description"}
        </p>
        <UtilityBookingForm
          handleSubmit={handleBooking}
          validBooking={validBooking}
          bookingFrom={bookingData.bookingFrom}
          bookingTo={bookingData.bookingTo}
        ></UtilityBookingForm>
      </div>
    </>
  );
};

export default Login;
