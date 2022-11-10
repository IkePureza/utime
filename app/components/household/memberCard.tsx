import React from "react";

import Image from "next/image";

import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/clientApp";
import { doc } from "firebase/firestore";

interface Props {
  userId: string;
  isOwner: boolean;
}

export default function MemberCard(props: Props) {
  const [userData, loading, error] = useDocumentData(
    doc(db, "users", props.userId)
  );

  return (
    <div className="card card-side card-compact w-60 bg-base-100 shadow-xl mb-2">
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span className="btn btn-ghost loading"></span>}
      {userData && (
        <>
          <div className="avatar">
            <div className="w-20 mask mask-squircle">
              <Image
                src={userData.data.photoURL || "/user.png"}
                alt={userData.data.displayName ?? ""}
                layout="fill"
              />
            </div>
          </div>
          <div className="card-body">
            <h2 className="card-title">
              {userData.data.displayName || userData.data.email}
            </h2>
            <p>{props.isOwner ? "Owner" : "Member"}</p>
          </div>
        </>
      )}
    </div>
  );
}
