import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { AuthContext } from "../context/AuthContext";
import AlertContext from "../context/alertProvider";

import { db } from "../firebase/clientApp";
import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";

interface DeleteHouseholdModalProps {
  houseId: string;
  isOwner: boolean;
}

export const DeleteHouseholdModalId = "delete-house-modal";

const DeleteHouseholdModal = (props: DeleteHouseholdModalProps) => {
  const alert = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const currentUser = authContext?.userData;

  const householdRef = doc(db, "household", props.houseId);
  const [household, loading, error] = useDocument(householdRef);

  const deleteModalCheckboxRef = useRef<HTMLInputElement>(null);

  const [householdMembers, setHouseholdMembers] = useState<any[]>();

  useEffect(() => {
    const getHouseMembers = async () => {
      const householdDoc = await getDoc(householdRef);
      const allMembers = await Promise.all(
        householdDoc.data()?.users.map(async (memberId: any) => {
          const memberRef = doc(db, "users", memberId);
          const memberName = await getDoc(memberRef).then((data) => {
            console.log(data.data()?.data.displayName);
            return data.data()?.data.displayName;
          });
          return [memberId, memberName];
        })
      );
      const withoutUser = allMembers.filter((e: any, i: any, a: any) => {
        return e[0] !== currentUser?.userId;
      });
      setHouseholdMembers(withoutUser);
    };

    getHouseMembers();
  });

  /** Leave a household.
   * Cannot leave if user is the owner of Household (Need to delegate ownership).
   * This automatically means that the last member (the owner) cannot leave the household.
   * */
  const handleLeaveHouse = async (event: any) => {
    const currentUserId = currentUser?.userId;
    const docRef = doc(db, "household", householdRef.id);
    router.push("/");
    try {
      await updateDoc(docRef, { users: arrayRemove(currentUserId) });
    } catch (error) {
      console.log("error");
      alert?.error(`An error has occured.`, 5);
    }
    console.log("House left");

    const message = `Successfully left ${household?.data()?.name}`;
    alert?.success(message, 5);
  };

  /**
   * Handler that delegates the ownership of the household to another user.
   */
  const handleDelegateOwner = async (event: any) => {
    event.preventDefault();
    const newOwnerId = event.target.elements.newOwner.value.split(",")[0];
    const newOwnerName = event.target.elements.newOwner.value.split(",")[1];

    const updateOwner = await updateDoc(householdRef, {
      owner: newOwnerId,
    }).then(() => {
      alert?.success(`Delegated ownership to ${newOwnerName}`, 5);
    });

    if (deleteModalCheckboxRef.current !== null) {
      deleteModalCheckboxRef.current.checked =
        !deleteModalCheckboxRef.current.checked;
    }
  };

  // Delete a household if the user is the owner of the household
  const handleDeleteHouse = async (event: any) => {
    if (!props.isOwner) {
      alert?.error("Need owner permission to delete household!", 5);
      return;
    }
    router.push("/");
    const docRef = await deleteDoc(doc(db, "household", householdRef.id));
    console.log("House deleted");

    const message = `Successfully deleted ${household?.data()?.name}`;
    alert?.success(message, 5);
  };

  return (
    <>
      <input
        type="checkbox"
        id="delete-house-modal"
        ref={deleteModalCheckboxRef}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="delete-house-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Household Settings</h3>
          {!props.isOwner && (
            <div className="flex flex-col mt-5">
              <h3 className="text-xl font-bold">Leave House</h3>
              <p>You&apos;ll need a new invitation to join this house again!</p>
              <input
                className="btn btn-error rounded-lg place-self-center mt-5"
                onClick={handleLeaveHouse}
                value="leave house"
              ></input>
            </div>
          )}
          <br></br>
          {props.isOwner && (
            <div className="flex flex-col">
              <form action="#" onSubmit={handleDelegateOwner}>
                <h3 className="text-xl font-bold">Delegate Ownership</h3>
                <p>Choose someone to handover the ownership of this UHouse!</p>
                <br />
                <div className="flex gap-x-5">
                  {householdMembers && householdMembers.length > 0 ? (
                    <>
                      <select
                        name="newOwner"
                        id="newOwner"
                        className="select select-primary w-full max-w-xs"
                      >
                        <option disabled selected>
                          Select the new owner!
                        </option>
                        {householdMembers.map((member: any) => {
                          return (
                            <option key={member[0]} value={member}>
                              {member[1]}
                            </option>
                          );
                        })}
                      </select>
                      <input
                        type="submit"
                        className="btn btn-warning"
                        value="Delegate"
                      ></input>
                    </>
                  ) : (
                    <>
                      <select
                        name="newOwner"
                        id="newOwner"
                        className="select w-full max-w-xs"
                        disabled
                      >
                        <option>You&apos;re the only one left!</option>
                      </select>
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value="Delegate"
                        disabled
                      ></input>
                    </>
                  )}
                </div>
              </form>
              <br />
              <h3 className="text-xl font-bold">Delete Household</h3>
              <div className="alert alert-warning shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>Warning: You cannot undo this action!</span>
                </div>
              </div>
              <button
                className="mt-5 btn btn-error rounded-lg place-self-center"
                onClick={handleDeleteHouse}
                id="deleteHouseholdButton"
              >
                delete house
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DeleteHouseholdModal;
