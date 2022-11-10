import React, { useContext, useState, useEffect, useRef } from "react";

import { AuthContext } from "../../../context/AuthContext";
import AlertContext from "../../../context/alertProvider";

import { useRouter } from "next/router";
import Image from "next/image";

import {
  addDoc,
  deleteDoc,
  updateDoc,
  arrayRemove,
  doc,
  collection,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/clientApp";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import NavBar from "../../../components/navBar";
import UtilityCard from "../../../components/utilityCard";
import NewUtilityForm from "../../../components/newUtilityForm";
import HouseholdCalendar from "../../../components/householdCalendar";
import HouseholdMembers from "../../../components/household/householdMembers";
import InviteCard from "../../../components/userInvites/inviteCard";
import Alert from "../../../components/alert";

import HouseholdEditModal, {
  householdEditModalId,
} from "../../../components/modals/householdEditModal";

const Household = () => {
  const router = useRouter();
  const { houseId }: any = router.query;
  const authContext = useContext(AuthContext);
  const alert = useContext(AlertContext);
  const currentUser = authContext?.userData;

  const householdRef = doc(db, "household", houseId);
  const amenityRef = collection(householdRef, "amenity");

  const createUtilityModalRef = useRef<HTMLInputElement>(null);
  0;
  const deleteModalCheckboxRef = useRef<HTMLInputElement>(null);

  const [household, loading, error] = useDocument(householdRef);
  const [amenityValue, amenityLoading, amenityError] =
    useCollection(amenityRef);

  const [householdMembers, setHouseholdMembers] = useState<any[]>();

  useEffect(() => {
    let active = true;
    loadMembers();
    return () => {
      active = false;
    };

    async function loadMembers() {
      if (household) {
        const allMembers = await Promise.all(
          household?.data()?.users.map(async (memberId: any) => {
            const memberRef = doc(db, "users", memberId);
            const memberName = await getDoc(memberRef).then((data) => {
              return data.data()?.data.displayName;
            });
            return [memberId, memberName];
          })
        );
        const withoutUser = allMembers.filter((e: any, i: any, a: any) => {
          return e[0] !== currentUser?.userId;
        });
        if (!active) {
          return;
        }
        setHouseholdMembers(withoutUser);
      }
    }
  }, []);

  const isOwner = (): boolean => {
    return household?.data()?.owner === currentUser?.userId;
  };

  const handleCreateAmenity = async (event: any) => {
    event.preventDefault();
    const { name, type, desc } = event.target.elements;
    const amenityRef = collection(householdRef, "amenity");
    const docRef = await addDoc(amenityRef, {
      name: name.value,
      type: type.value,
      desc: desc.value,
    });
    if (createUtilityModalRef.current !== null) {
      createUtilityModalRef.current.checked =
        !createUtilityModalRef.current.checked;
    }
  };

  // Delete a household if the user is the owner of the household
  const handleDeleteHouse = async (event: any) => {
    if (!isOwner()) {
      alert?.error("Need owner permission to delete household!", 5);
      return;
    }
    router.push("/");
    const docRef = await deleteDoc(doc(db, "household", householdRef.id));
    console.log("House deleted");

    const message = `Successfully deleted ${household?.data()?.name}`;
    alert?.success(message, 5);
  };

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

  return (
    <>
      <NavBar></NavBar>
      <div className="flex flex-row max-h-screen min-w-full px-5 py-5 w-max mx-auto">
        <div className="flex flex-col basis-1/4 items-center justify-start">
          <h1 className="text-center font-black text-2xl mb-2">Utilities</h1>
          <div className="flex flex-col gap-y-3 w-full">
            {amenityError && (
              <strong>Error: {JSON.stringify(amenityError)}</strong>
            )}
            {amenityLoading && <span className="btn btn-ghost loading"></span>}
            {amenityValue && (
              <div className="flex flex-col justify-around items-center">
                {amenityValue.docs.map((doc) => (
                  <UtilityCard
                    id={doc.id}
                    houseId={houseId}
                    key={doc.id}
                    data={doc.data()}
                  ></UtilityCard>
                ))}
              </div>
            )}
          </div>
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
              {!isOwner() && (
                <div className="flex flex-col mt-5">
                  <h3 className="text-xl font-bold">Leave House</h3>
                  <p>
                    You&apos;ll need a new invitation to join this house again!
                  </p>
                  <input
                    className="btn btn-error rounded-lg place-self-center mt-5"
                    onClick={handleLeaveHouse}
                    value="leave house"
                  ></input>
                </div>
              )}
              <br></br>
              {isOwner() && (
                <div className="flex flex-col">
                  <form action="#" onSubmit={handleDelegateOwner}>
                    <h3 className="text-xl font-bold">Delegate Ownership</h3>
                    <p>
                      Choose someone to handover the ownership of this UHouse!
                    </p>
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
          <label
            id="newUtilityButton"
            htmlFor="new-utility-modal"
            className="btn btn-wide btn-primary modal-button mb-4"
          >
            + Add a new Utility
          </label>
          <input
            type="checkbox"
            id="new-utility-modal"
            ref={createUtilityModalRef}
            className="modal-toggle"
          />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="new-utility-modal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <h3 className="text-lg font-bold">Add a new utility</h3>
              <p className="py-4">
                Enter the details of your new utility below.
              </p>
              <NewUtilityForm handleSubmit={handleCreateAmenity} />
            </div>
          </div>
        </div>
        <div className="basis-1/2">
          <div className="gap-x-5 flex items-end justify-center">
            <Image
              className="rounded-xl avatar"
              src={
                household?.data()?.photoURL ||
                "https://placeimg.com/80/80/house"
              }
              width={90}
              height={90}
              alt="household pic"
            />
            <h1 className="text-center font-black text-3xl mb-5">
              Household {household?.data()?.name}
            </h1>
            <div className="dropdown dropdown-right mb-5">
              <label
                tabIndex={0}
                id="householdMenu"
                className="btn btn-circle btn-ghost btn-xs"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                {isOwner() && (
                  <li>
                    <label
                      id="householdEditSettings"
                      htmlFor={householdEditModalId}
                    >
                      Edit
                    </label>
                  </li>
                )}
                <li>
                  <label
                    id="householdDeleteSettings"
                    htmlFor="delete-house-modal"
                    className="text-red-500"
                  >
                    Delete/Delegate
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <HouseholdCalendar houseId={houseId}></HouseholdCalendar>
        </div>
        <div className="basis-1/4">
          <h1 className="text-center font-black text-2xl mb-2">Users</h1>
          <HouseholdMembers houseId={houseId} />
          <InviteCard houseId={houseId} />
        </div>
        <Alert />
      </div>
      {isOwner() && <HouseholdEditModal houseId={houseId} />}
    </>
  );
};

export default Household;
