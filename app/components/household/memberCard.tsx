import React from "react";

import Image from "next/image";

import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/clientApp";
import { doc } from "firebase/firestore";

interface Props {
  userId: string;
}

export default function MemberCard(props: Props) {
  const [userData, loading, error] = useDocument(
    doc(db, "userId", props.userId)
  );

  const userPhoto = userData?.data()?.photoURL || "/user.png";

  return (
    <div className="card card-side card-compact w-60 bg-base-100 shadow-xl mb-2">
      <Image
        src={userPhoto}
        width={64}
        height={64}
        alt="Shoes"
        className="rounded-r-xl"
      />
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Loading...</span>}
      {userData && (
        <div className="card-body">
          <h2 className="card-title">{userData.data()?.displayName}</h2>
          <p>Member</p>
          {/* <div className="card-actions justify-end">
          </div> */}
        </div>
      )}
    </div>
  );
}
