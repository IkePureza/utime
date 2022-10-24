import React, { useContext, useRef, useState } from "react";

import { AuthContext } from "../../../../../context/AuthContext";
import { useRouter } from "next/router";

import {
  addDoc,
  doc,
  collection,
  Timestamp,
  where,
  query,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../../../../../firebase/clientApp";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { DocumentData } from "@google-cloud/firestore";
import NavBar from "../../../../../components/navBar";
import UtilityBookingForm from "../../../../../components/utilityBookingForm";
import UtilityCalendar from "../../../../../components/utilityCalendar";

const Utility = () => {
  const router = useRouter();
  const { houseId, utilityId }: any = router.query;
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.userData;
  const householdRef = doc(db, "household", houseId);
  const amenityRef = doc(householdRef, "amenity", utilityId);
  const [householdValue, householdLoading, householdError] =
    useDocumentData(householdRef);
  const [amenityValue, loading, error, snapshot] = useDocumentData(amenityRef);
  const [bookingsValue, bookingsLoading, bookingsError] = useCollectionData(
    query(collection(db, "booking"), where("amenityId", "==", utilityId))
  );
  const [amenityBookingError, setAmenityBookingError] = useState<
    DocumentData[]
  >([]);

  const modalCheckboxRef = useRef<HTMLInputElement>(null);

  const handleBooking = async (event: any) => {
    event.preventDefault();

    const { desc, from, to } = event.target.elements;

    if (bookingsError || bookingsLoading || !bookingsValue) {
      return;
    }

    const conflictingBookings = bookingsValue?.filter(
      (data) =>
        new Date(from.value) <= new Date(data.to.seconds * 1000) &&
        new Date(to.value) >= new Date(data.from.seconds * 1000)
    );

    if (conflictingBookings?.length > 0) {
      setAmenityBookingError(conflictingBookings);
      return;
    }

    const docRef = await addDoc(collection(db, "booking"), {
      desc: desc.value,
      from: Timestamp.fromDate(new Date(from.value)),
      to: Timestamp.fromDate(new Date(to.value)),
      householdId: houseId,
      householdName: householdValue?.name ?? "",
      amenityId: utilityId,
      amenityName: amenityValue?.name ?? "",
      amenityType: amenityValue?.type ?? "",
      userId: currentUser?.userId,
      userName: currentUser?.userName || currentUser?.userEmail,
    });

    // Booking duration in hrs (1 decimal place)
    const duration =
      Math.round(
        ((new Date(to.value).getTime() - new Date(from.value).getTime()) /
          3600000) *
          10
      ) / 10;

    // Add user stat field
    if (currentUser) {
      await updateDoc(doc(db, "users", currentUser?.userId), {
        totalMinutes: increment(duration),
      });
    }

    if (modalCheckboxRef.current !== null) {
      modalCheckboxRef.current.checked = !modalCheckboxRef.current.checked;
    }
  };

  return (
    <>
      <NavBar></NavBar>
      <div className="flex flex-row justify-center items-center">
        <h1 className="text-center font-black text-5xl mb-2 mt-24">
          {amenityValue?.type}
        </h1>
        <h1 className="text-center font-semibold text-2xl mb-2 mr-1 ml-3 mt-24">
          {amenityValue?.name}
        </h1>
        <div className="dropdown md:dropdown-right dropdown-left mt-24">
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
        
        <p className="text-center mb-8">
          {amenityValue?.desc ?? "No Description"}
        </p>
        <label
          id="newBookingButton"
          htmlFor="new-booking-modal"
          className="btn btn-wide btn-accent modal-button mb-4 shadow-md"
        >
          Book
        </label>
        <input
          type="checkbox"
          id="new-booking-modal"
          ref={modalCheckboxRef}
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box relative">
            <label
              id="closeBookingModal"
              htmlFor="new-booking-modal"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold">Create a new booking</h3>
            <p className="py-4">Enter the details of your new booking below.</p>
            {amenityBookingError.length != 0 && (
              <div className="alert alert-error shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    Error! Booking conflict with{" "}
                    {amenityBookingError[0].userName} booking at{" "}
                    {new Date(
                      amenityBookingError[0].from.seconds * 1000
                    ).toString()}
                    .
                  </span>
                </div>
              </div>
            )}
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

export default Utility;
