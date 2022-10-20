import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import { db } from "../firebase/clientApp";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";
import { collection, doc, query, where } from "firebase/firestore";

interface UserStatsProps {}

const UserStats = (props: UserStatsProps) => {
  const appContext = useContext(AuthContext);
  const userData = appContext?.userData;

  const [bookings, bookingsLoading, bookingsError] = useCollection(
    query(collection(db, "booking"), where("userId", "==", userData?.userId))
  );

  const [userDoc, userLoading, userError] = useDocumentData(
    doc(db, "users", userData?.userId ?? "")
  );

  return (
    <div className="rounded-xl border shadow-lg p-10 h-fit">
      <h2 className="text-2xl font-bold">Some UStats</h2>
      <br />
      <div className="grid grid-rows-2 grid-cols-2 text-center">
        <h3 className="font-bold">No. of Bookings</h3>
        <h3 className="font-bold">Total Booking UTime</h3>
        {bookingsError && (
          <strong>Error: {JSON.stringify(bookingsError)}</strong>
        )}
        {bookingsLoading && ""}
        {bookings && (
          <p className="font-black text-4xl">
            {bookings.docs.length}{" "}
            {bookings.docs.length == 1 ? (
              <span className="text-sm">session</span>
            ) : (
              <span className="text-sm">sessions</span>
            )}
          </p>
        )}
        {userError && <strong>Error: {JSON.stringify(userError)}</strong>}
        {userLoading && ""}
        {userDoc && (
          <p className="font-black text-4xl">
            {userDoc.totalMinutes || 0} <span className="text-sm">hrs</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default UserStats;
