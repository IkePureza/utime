import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { db } from "../../firebase/clientApp";
import {
  addDoc,
  doc,
  collection,
  Timestamp,
  where,
  query,
  updateDoc,
} from "firebase/firestore";

interface Props {
  userId: string;
}

export default function MemberCard(props: Props) {
  const [userData, loading, error] = useDocumentData(
    doc(db, "userId", props.userId)
  );

  return (
    <div className="card card-side card-compact w-96 bg-base-100 shadow-xl mb-2">
      <Image
        src={userData.data().icon}
        width={148}
        height={148}
        alt="Shoes"
        className="rounded-r-xl"
      />
    </div>
  );
}
