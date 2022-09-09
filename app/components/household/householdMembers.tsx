import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useDocument } from "react-firebase-hooks/firestore";

import {
  collection,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../../firebase/clientApp";

interface Props {
  id: string;
}

export default function HouseholdMembers(props: Props) {
  const [members, loading, error] = useDocument(doc(db, "household", props.id));

  return (
    <React.Fragment>
      <h1 className="text-left text-3xl">Members:</h1>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Loading...</span>}
      {members && (
        
      )}
    </React.Fragment>
  );
}
