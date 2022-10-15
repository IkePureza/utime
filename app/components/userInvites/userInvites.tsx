import React, { useContext } from "react";

import { db } from "../../firebase/clientApp";
import {
  collection,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
  arrayUnion,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import { AuthContext } from "../../context/AuthContext";
import UserInviteCard from "./userInviteCard";

export default function UserInvites() {
  const appContext = useContext(AuthContext);
  const userData = appContext?.userData;

  const [invites, loading, error] = useCollection(
    query(
      collection(db, "inviteTokens"),
      where("email", "==", userData?.userEmail)
    )
  );

  function inviteAcceptHandler(event: any) {
    const inviteId = event.target.getAttribute("data-arg1");
    const houseId = event.target.getAttribute("data-arg2");
    // Add user to household
    updateDoc(doc(db, "household", houseId), {
      users: arrayUnion(userData?.userId),
    });
    // Delete invite token
    deleteDoc(doc(db, "inviteTokens", inviteId));
  }

  async function inviteDeleteHandler(event: any) {
    const inviteId = event.target.getAttribute("data-arg1");
    await deleteDoc(doc(db, "inviteTokens", inviteId));
    console.log("Invite declined");
  }

  return (
    <div className="mx-10">
      <div className="indicator">
        {invites && (
          <span className="indicator-item badge badge-primary">
            {invites.docs.length}
          </span>
        )}
        <div>
          <h1 className="text-2xl text-center font-black mb-10">Invites</h1>
        </div>
      </div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Loading...</span>}
      {invites && invites.docs.length > 0 ? (
        <div className="flex flex-col mx-auto">
          {invites.docs.map((doc) => (
            <UserInviteCard
              key={doc.id}
              inviteId={doc.id}
              houseId={doc.data().houseId}
              expiryTime={doc.data().expiry_time.toDate()}
              invitee={doc.data().invitee}
              acceptHandler={inviteAcceptHandler}
              deleteHandler={inviteDeleteHandler}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">🌵 😭 🌵</p>
      )}
    </div>
  );
}
