import React, { useContext, useRef } from "react";

import { AuthContext } from "../../../context/AuthContext";
import AlertContext from "../../../context/alertProvider";

import { useRouter } from "next/router";
import Image from "next/image";

import { addDoc, doc, collection } from "firebase/firestore";
import { db } from "../../../firebase/clientApp";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import NavBar from "../../../components/navBar";
import UtilityCard from "../../../components/utilityCard";
import NewUtilityForm from "../../../components/newUtilityForm";
import HouseholdCalendar from "../../../components/householdCalendar";
import HouseholdMembers from "../../../components/household/householdMembers";
import InviteCard from "../../../components/userInvites/inviteCard";
import Alert from "../../../components/alert";
import DeleteHouseholdModal, {
  DeleteHouseholdModalId,
} from "../../../components/deleteHouseholdModal";

import HouseholdEditModal, {
  householdEditModalId,
} from "../../../components/modals/householdEditModal";

const Household = () => {
  const router = useRouter();
  const { houseId }: any = router.query;
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.userData;

  const householdRef = doc(db, "household", houseId);
  const amenityRef = collection(householdRef, "amenity");

  const createUtilityModalRef = useRef<HTMLInputElement>(null);

  const [household, loading, error] = useDocument(householdRef);
  const [amenityValue, amenityLoading, amenityError] =
    useCollection(amenityRef);

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

  return (
    <>
      <NavBar></NavBar>
     
      <div className="flex xl:flex-row flex-col items-center justify-center pt-20 pb-4 mb-2 shadow-sm max-w-full">
            <Image
              className="rounded-xl avatar shadow-md"
              src={
                household?.data()?.photoURL ||
                "/houseDefault.jpg"
              }
              width={90}
              height={90}
              alt="household pic"
            />
            <div className = "flex flex-row pt-2">
              <h1 className="pl-5 text-center font-semibold xl:text-4xl max-w-full text-3xl mb-5 break-normal break-words">
                {household?.data()?.name}
              </h1>
              <div className="dropdown dropdown-left xl:dropdown-right mb-4">
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
                      htmlFor={DeleteHouseholdModalId}
                      className="text-red-500"
                    >
                      Delete/Delegate/Leave
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
      <div className="flex xl:flex-row flex-col xl:px-5 pb-5 max-w-screen mx-auto">
        
        <div className="xl:basis-3/4 order-2 xl:order-1">
          
          <HouseholdCalendar houseId={houseId}></HouseholdCalendar>
        </div>
        <div className="xl:basis-1/4 items-center content-center justify-content order-1 xl:order-2">
          
          <h1 className="text-center font-semibold text-2xl mb-2">Users</h1>
          <HouseholdMembers houseId={houseId} />
          <InviteCard houseId={houseId} />

          <h1 className="text-center font-semibold text-2xl mb-2 mt-4">Utilities</h1>
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
          <DeleteHouseholdModal isOwner={isOwner()} houseId={houseId} />
          <div className="flex flex-col justify-around items-center">
            <label
              id="newUtilityButton"
              htmlFor="new-utility-modal"
              className="btn btn-wide btn-accent modal-button mb-4"
            >
              + Add a new Utility
            </label>
          </div>
          <input
            type="checkbox"
            id="new-utility-modal"
            ref={createUtilityModalRef}//modalCHeckboxRef?
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

        <Alert />
      </div>
      {isOwner() && <HouseholdEditModal houseId={houseId} />}
    </>
  );
};

export default Household;
