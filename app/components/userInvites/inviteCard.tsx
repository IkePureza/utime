import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import {
  addDoc,
  collection,
  query,
  where,
  Timestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase/clientApp";
import {
  reauthenticateWithCredential,
  reauthenticateWithRedirect,
} from "firebase/auth";

interface inviteCardProps {
  houseId: string;
}

export default function InviteCard(props: inviteCardProps) {
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.userData;
  const invitesRef = collection(db, "inviteTokens");

  const [errorMsg, setErrorMsg] = useState("");

  // Checks whether user has already been invited to a given house
  const userInviteExists = async (invitedEmail: string) => {
    const q1 = query(
      collection(db, "inviteTokens"),
      where("email", "==", invitedEmail),
      where("houseId", "==", props.houseId)
    );

    const snap = await getDocs(q1);
    if (!snap.empty) {
      return true;
    }
    return false;
  };

  const handleUserInvite = async (event: any) => {
    event.preventDefault();
    setErrorMsg("");
    const inviteEmail = event.target.elements.inviteEmail;

    console.log("entered: ", inviteEmail.value);
    console.log("current user: ", currentUser?.userEmail);

    inviteEmail.classList.remove("input-error");
    if (inviteEmail.value === currentUser?.userEmail) {
      inviteEmail.classList.add("input-error");
      setErrorMsg("You can't invite yourself LOL");
      console.log("Users cannot invite themselves!");
      return;
    } else if (await userInviteExists(inviteEmail.value)) {
      inviteEmail.classList.add("input-error");
      setErrorMsg("Invite already sent to this email address!");
      console.log("Invite already sent to this email!");
      return;
    }

    const expiresIn = 7; // a week
    const createdAt = Timestamp.now().toDate();
    createdAt.setDate(createdAt.getDate() + expiresIn);

    const expiry_date = Timestamp.fromDate(createdAt);

    const createInvite = await addDoc(invitesRef, {
      email: inviteEmail.value,
      expiry_time: expiry_date,
      houseId: props.houseId,
      invitee: currentUser?.userName,
    });
    console.log("Document written with ID: ", createInvite.id);

    inviteEmail.placeholder = "Sent!";
  };

  return (
    <>
      <div className="text-xl text-center font-black mt-10">
        Invite By Email Address
      </div>
      <div className="flex flex-col place-items-center mt-2">
        <form onSubmit={handleUserInvite} action="#">
          <div className="form-control">
            <div className="input-group">
              <input
                id="inviteEmail"
                name="inviteEmail"
                type="email"
                placeholder="Email Address"
                className="input input-bordered input-sm"
                required
              />
              <input
                className="btn btn-primary btn-sm justify-end"
                type="submit"
                value="Add"
              ></input>
            </div>
          </div>
        </form>
        <p className="text-xs text-red-500 mt-1">{errorMsg}</p>
      </div>
    </>
  );
}
