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
    <div className="stats stats-vertical xl:stats-horizontal shadow">
      <div className="stat">
        <div className="stat-figure text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Total Bookings</div>
        {bookingsError && (
          <strong>Error: {JSON.stringify(bookingsError)}</strong>
        )}
        {bookingsLoading && <span className="btn loading btn-ghost"></span>}
        {bookings && (
          <div className="stat-value text-primary">{bookings.docs.length}</div>
        )}

        <div className="stat-desc">Keep it going!</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Total Booking UTime</div>
        {userError && <strong>Error: {JSON.stringify(userError)}</strong>}
        {userLoading && ""}
        {userDoc && (
          <>
            <div className="stat-value text-secondary">
              {userDoc?.totalMinutes || 0} <span className="text-sm">hrs</span>
            </div>
            <div className="stat-desc">
              {Math.round(
                userDoc?.totalMinutes
                  ? ((userDoc?.totalMinutes / 700800) * 10000) / 100
                  : 0
              )}
              % of your lifespan spent on the loo!
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserStats;
