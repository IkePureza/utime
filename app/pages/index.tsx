import React, { useContext, useEffect, useRef, useState } from "react";

import { db } from "../firebase/clientApp";
import { collection, addDoc, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import AuthRoute from "../HOC/authRoute";

import { AuthContext } from "../context/AuthContext";
import Alert from "../components/alert";

import NavBar from "../components/navBar";
import HouseholdCard from "../components/householdCard";
import NewHouseForm from "../components/newHouseForm";
import RecentActivityAgenda from "../components/recentActivityAgenda";
import UserInvites from "../components/userInvites/userInvites";

function Index() {
  const appContext = useContext(AuthContext);
  const userData = appContext?.userData;
  const [householdsValue, householdsLoading, householdsError] = useCollection(
    query(
      collection(db, "household"),
      where("users", "array-contains", userData?.userId ?? null)
    )
  );
  const [userHouseholds, setUserHouseholds] = useState<any[] | undefined>([
    { id: "", name: "" },
  ]);

  const modalCheckboxRef = useRef<HTMLInputElement>(null);

  const handleCreateHousehold = async (event: any) => {
    event.preventDefault();
    const houseName = event.target.elements.houseName;
    const houseDesc = event.target.elements.houseDesc;

    const docRef = await addDoc(collection(db, "household"), {
      name: houseName.value,
      desc: houseDesc.value,
      users: [userData?.userId], //need to change this bit to match the form inputs
      owner: userData?.userId,
    });

    if (modalCheckboxRef.current !== null) {
      modalCheckboxRef.current.checked = !modalCheckboxRef.current.checked;
    }
  };

  useEffect(() => {
    setUserHouseholds(
      householdsValue?.docs.map((doc) => {
        return {
          id: doc.id,
          name: doc.data().name,
        };
      })
    );
  }, [householdsValue]);

  return (
    <AuthRoute>
      <NavBar></NavBar>
      <div className="relative flex flex-row max-h-screen min-w-full px-5 py-5 w-max mx-auto">
        <div className="basis-1/3">
          <h1 className="text-4xl text-center font-black mb-10">
            Recent Activity
          </h1>
          <RecentActivityAgenda
            userHouseholds={userHouseholds}
          ></RecentActivityAgenda>
        </div>
        <div className="basis-1/3 mx-auto flex flex-col items-center max-h-max">
          <h1 className="text-4xl text-center font-black mb-10">Your Homes</h1>
          <div
            className="overflow-auto container shadow-md rounded-md"
            id="houseHolds"
          >
            <p>
              {householdsError && (
                <strong>Error: {JSON.stringify(householdsError)}</strong>
              )}
              {householdsLoading && (
                <span className="btn loading btn-ghost"></span>
              )}
              {householdsValue && householdsValue.docs.length > 0 ? (
                <div className="flex flex-col justify-around items-center">
                  {householdsValue.docs.map((doc) => (
                    <HouseholdCard
                      desc={doc.data().desc}
                      id={doc.id}
                      key={doc.id}
                      name={doc.data().name}
                      icon={doc.data().photoURL}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-2xl font-bold text-teal-500">
                  Add a House by clicking the button below!
                  <br />
                </p>
              )}
            </p>
          </div>
          <label
            htmlFor="new-house-modal"
            className="btn btn-wide modal-button mt-10 mb-20"
            id="createHousehold"
          >
            + Add a new Household
          </label>
          {/* <HouseholdCard icon="/plus.png" desc="Add a new household" id="" name="New House"/> */}
        </div>
        <div className="basis-1/3 flex-col" id="userInvites">
          <UserInvites />
        </div>
        <Alert />
      </div>

      <input
        type="checkbox"
        id="new-house-modal"
        ref={modalCheckboxRef}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="new-house-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Add a new Household</h3>
          <p className="py-4">Enter the details of your new home below.</p>
          <NewHouseForm handleClick={handleCreateHousehold} />
        </div>
      </div>
    </AuthRoute>
  );
}

export default Index;
