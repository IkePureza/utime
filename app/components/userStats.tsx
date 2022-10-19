import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import { db } from "../firebase/clientApp";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";

interface UserStatsProps {}

const UserStats = (props: UserStatsProps) => {
  const appContext = useContext(AuthContext);
  const userData = appContext?.userData;

  const [bookings, loading, error] = useCollection(
    query(collection(db, "bookings"), where("userId", "==", userData?.userId))
  );

  return (
    <div className="rounded-xl border shadow-lg p-10 h-1/2">
      <h2 className="text-2xl font-bold">Some UStats</h2>
      <br />
      <div className="grid grid-rows-2 grid-cols-2 text-center">
        <h3 className="font-bold">No. of Bookings</h3>
        <h3 className="font-bold">Total Booking UTime</h3>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && ""}
        {bookings && (
          <p className="font-black text-4xl">{bookings.docs.length}</p>
        )}
      </div>
    </div>
  );
};

export default UserStats;
