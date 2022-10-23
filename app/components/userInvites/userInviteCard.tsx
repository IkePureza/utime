import React, { useContext } from "react";
import Image from "next/image";

import { db } from "../../firebase/clientApp";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { AuthContext } from "../../context/AuthContext";

interface userInvitesProps {
  inviteId: string;
  houseId: string;
  expiryTime: Date;
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
    doc(db, "household", props.houseId)
  );

  return (
    <React.Fragment key={props.inviteId}>
      <div className="card card-side card-compact xl:w-96 w-80 rounded-xl bg-zinc-100 shadow-xl mb-2">
        <Image
          src={icon}
          width={80}
          height={100}
          alt="Shoes"
          className="rounded-r-xl object-cover shadow-md"
        />
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span className="btn btn-ghost loading"></span>}
        {houseData && (
          <React.Fragment>
            <div className="card-body gap-0">
              <label
                htmlFor={`modal-${props.inviteId}`}
                className="card-title text-left btn-ghost normal-case rounded-xl px-2 hover:cursor-pointer"
              >
                {houseData.name}
              </label>
              <div className="card-actions justify-end mt-2">
                <button
                  className="btn btn-accent btn-xs"
                  onClick={props.acceptHandler}
                  data-arg1={props.inviteId}
                  data-arg2={props.houseId}
                >
                  Accept
                </button>

                <button
                  className="btn btn-xs"
                  onClick={props.deleteHandler}
                  data-arg1={props.inviteId}
                  data-arg2={props.houseId}
                >
                  Delete
                </button>
              </div>
            </div>
            <input
              type="checkbox"
              id={`modal-${props.inviteId}`}
              className="modal-toggle"
            />
            <div className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-4xl">
                  Invitation to {houseData.name}
                </h3>
                <p className="py-4">
                  You`&apos;`ve been invited by {props.invitee} to join in a
                  UTime Group together!
                  <br></br>
                  This invitation expires on {props.expiryTime.toString()}
                </p>
                <div className="modal-action">
                  <label
                    htmlFor={`modal-${props.inviteId}`}
                    className="btn h-fit w-fit"
                  >
                    OK!
                  </label>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}
