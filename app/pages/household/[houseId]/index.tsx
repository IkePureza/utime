import React, { useContext, useRef } from "react";

import { AuthContext } from "../../../context/AuthContext";
import { useRouter } from "next/router";

import { addDoc, doc, collection, where, query } from "firebase/firestore";
import { db } from "../../../firebase/clientApp";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import NavBar from "../../../components/navBar";
import UtilityCard from "../../../components/utilityCard";
import NewUtilityForm from "../../../components/newUtilityForm";
import HouseholdCalendar from "../../../components/householdCalendar";
import HouseholdMembers from "../../../components/household/householdMembers";
import InviteCard from "../../../components/userInvites/inviteCard";

const Household = () => {
  const router = useRouter();
  const { houseId }: any = router.query;
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.userData;
  const householdRef = doc(db, "household", houseId);
  const amenityRef = collection(householdRef, "amenity");
  const bookingsRef = collection(db, "booking");

  const modalCheckboxRef = useRef<HTMLInputElement>(null);

  const [value, loading, error] = useDocument(householdRef);
  const [bookingValue, bookingLoading, bookingError] = useCollection(
    query(bookingsRef, where("householdId", "==", houseId))
  );
  const [amenityValue, amenityLoading, amenityError] =
    useCollection(amenityRef);

  const handleCreateAmenity = async (event: any) => {
    event.preventDefault();
    const { name, type, desc } = event.target.elements;
    const amenityRef = collection(householdRef, "amenity");
    const docRef = await addDoc(amenityRef, {
      name: name.value,
      type: type.value,
      desc: desc.value,
    });
    if (modalCheckboxRef.current !== null) {
      modalCheckboxRef.current.checked = !modalCheckboxRef.current.checked;
    }
  };

  return (
    <>
      <NavBar></NavBar>
      <h1 className="text-center font-semibold text-4xl mb-2 pt-24">
        {" "}
        {value?.data()?.name}
      </h1>
      <div className="flex flex-row max-h-screen min-w-full px-5 pb-5 w-max mx-auto">
        
        <div className="basis-3/4">
          
          <HouseholdCalendar houseId={houseId}></HouseholdCalendar>
        </div>
        <div className="basis-1/4 items-center content-center justify-content">
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
          <div className="flex flex-col justify-around items-center">
            <label
              htmlFor="new-utility-modal"
              className="btn btn-wide btn-accent modal-button mb-4"
            >
              + Add a new Utility
            </label>
          </div>
          <input
            type="checkbox"
            id="new-utility-modal"
            ref={modalCheckboxRef}
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
      </div>
    </>
  );
};

export default Household;
