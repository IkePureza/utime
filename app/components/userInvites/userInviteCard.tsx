import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import { auth, db } from "../../firebase/clientApp";
import {
  collection,
  doc,
  addDoc,
  query,
  where,
  updateDoc,
  deleteDoc,
  Timestamp,
  getDoc,
} from "firebase/firestore";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";

import { AuthContext } from "../../context/AuthContext";
import { FieldValue } from "@google-cloud/firestore";

interface userInvitesProps {
  inviteId: string;
  houseId: string;
  expiry_time: Timestamp;
  icon?: string;
  invitee: string;
  acceptHandler: (event: any) => void;
  deleteHandler: (event: any) => void;
}

export default function UserInviteCard(props: userInvitesProps) {
  const appContext = useContext(AuthContext);
  const userData = appContext?.userData;

  const icon = props.icon || "https://placeimg.com/148/148/arch";

  const [houseData, loading, error] = useDocumentData(
    doc(db,'household',props.houseId)
  );

  const message = props.invitee + " has invited you to join their house!";

  return (
    <React.Fragment key={props.inviteId}>
      <div className="card card-side card-compact w-96 bg-base-100 shadow-xl mb-2">
        <Image
          src={icon}
          width={148}
          height={148}
          alt="Shoes"
          className="rounded-r-xl"
        />
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {houseData && (
          <div className="card-body tooltip-success" data-tip={message}>
            <h2 className="card-title">{houseData.name}</h2>
            <p>Expires: {props.expiry_time.toString()}</p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary ml-5 mt-2"
                onClick={props.acceptHandler}
                data-arg1={props.inviteId}
                data-arg2={props.houseId}
              >
                Accept
              </button>
              <button
                className="btn btn-primary ml-5 mt-2"
                onClick={props.deleteHandler}
                data-arg1={props.inviteId}
                data-arg2={props.houseId}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
