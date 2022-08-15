import React, { useContext, useEffect } from "react";

import { AuthContext } from "../../../context/AuthContext";
import { useRouter } from "next/router";

import {
  addDoc,
  doc,
  collection,
  Timestamp,
  where,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/clientApp";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import Link from "next/link";
import { DocumentData } from "@google-cloud/firestore";

const Login = () => {
  const router = useRouter();
  const { id }: any = router.query;
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.userData;
  const householdRef = doc(db, "household", id);
  const amenityRef = collection(householdRef, "amenity");
  const bookingsRef = collection(db, "booking");

  const [value, loading, error] = useDocument(householdRef);
  const [bookingValue, bookingLoading, bookingError] = useCollection(
    query(bookingsRef, where("householdId", "==", id))
  );
  const [amenityValue, amenityLoading, amenityError] =
    useCollection(amenityRef);

  const handleCreateAmenity = async (event: any) => {
    event.preventDefault();
    const { name } = event.target.elements;
    const amenityRef = collection(householdRef, "amenity");
    const docRef = await addDoc(amenityRef, {
      name: name.value,
    });
    console.log("Document written with ID: ", docRef.id);
  };

  const handleBooking = async (amenityId: string) => {
    const bookingRef = collection(db, "booking");
    const docRef = await addDoc(bookingRef, {
      amenityId,
      userId: currentUser?.userId,
      householdId: id,
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
    <div className="grid place-content-center px-10 py-10 shadow-lg w-max mx-auto mt-6">
      <h1 className="text-center font-black text-3xl mb-2">
        {" "}
        Household {value?.data()?.name}
      </h1>
      <div className="flex flex-col gap-y-3">
        <form
          onSubmit={handleCreateAmenity}
          className="bg-slate-200 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Amenity name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="name"
              id="name"
            ></input>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="transition-all duration-500 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create Amenity
            </button>
          </div>
        </form>
        <h1 className="text-4xl mb-4 text-center">Amenities</h1>
        <div>
          <p>
            {amenityError && (
              <strong>Error: {JSON.stringify(amenityError)}</strong>
            )}
            {amenityLoading && <span>Collection: Loading...</span>}
            {amenityValue && (
              <div className="flex flex-col justify-around items-center">
                {amenityValue.docs.map((doc) => (
                  <React.Fragment key={doc.id}>
                    <div className="justify-center flex-1 block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                      <Link href="household/[id]" as={`household/${doc.id}`}>
                        <div className="mb-2 text-2xl  font-bold tracking-tight text-gray-900 dark:text-white">
                          {doc.data().name}
                        </div>
                      </Link>
                      <button
                        onClick={() => handleBooking(doc.id)}
                        className="inline-flex disabled:bg-red-500 disabled:hover:bg-red-500 items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        disabled={isAmenityBooked(doc.data())}
                      >
                        {isAmenityBooked(doc.data())
                          ? `Already booked for ${doc
                              .data()
                              ?.latestBooking?.to.toDate()}`
                          : "Book now"}
                      </button>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
