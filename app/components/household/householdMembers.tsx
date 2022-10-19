import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

import {
  collection,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../../firebase/clientApp";

import MemberCard from "../household/memberCard";

interface Props {
  houseId: string;
}

export default function HouseholdMembers(props: Props) {
  const [members, loading, error] = useDocumentData(
    doc(db, "household", props.houseId)
  );

  return (
    <React.Fragment>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span className="btn btn-ghost loading"></span>}
      {members && (
        <div className="flex flex-col justify-around items-center">
          {members.users.map((userId: string) => (
            <MemberCard key={userId} userId={userId} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
}
