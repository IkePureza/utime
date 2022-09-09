import React, { useContext } from "react";

import { db } from "../../firebase/clientApp";
import {
  collection,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import { AuthContext } from "../../context/AuthContext";
import { FieldValue } from "@google-cloud/firestore";
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
      users: FieldValue.arrayUnion(userData?.userId),
    });
    // Delete invite token
    deleteDoc(doc(db, "inviteTokens", inviteId));
  }

  function inviteDeleteHandler(event: any) {
    const inviteId = event.target.getAttribute("data-arg1");
    deleteDoc(doc(db, "inviteTokens", inviteId));
  }

  return (
    <React.Fragment>
      <h1 className="text-2xl text-center font-black mb-10">Invites</h1>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {invites && (
        <div className="flex flex-col justify-around items-center">
          {invites.docs.map((doc) => (
            <UserInviteCard
              key={doc.id}
              inviteId={doc.id}
              houseId={doc.data().houseid}
              expiry_time={doc.data().expiry_time}
              invitee={doc.data().invitee}
              acceptHandler={inviteAcceptHandler}
              deleteHandler={inviteDeleteHandler}
            />
          ))}
        </div>
      )}
      {!invites && <p>Failed to fetch invites!</p>}
    </React.Fragment>
  );
}
