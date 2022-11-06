import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";

import { db } from "../firebase/clientApp";
import { collection, addDoc, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import AuthRoute from "../HOC/authRoute";

import { AuthContext } from "../context/AuthContext";

import NavBar from "../components/navBar";
import HouseholdCard from "../components/householdCard";
import NewHouseCard from "../components/newhouseCard";
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
      <div className="flex xl:flex-row flex-col max-h-screen px-5 pt-24 pb-10 max-w-screen mx-auto ">
        
        
        <div className="xl:order-2 xl:basis-1/3 mx-auto flex flex-col items-center">
          <a className="text-4xl text-center mb-8 font-semibold">Your Homes</a>
          <div className="overflow-auto container h-3/5 rounded-md">
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
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center xl:text-2xl font-bold text-teal-500 break-normal break-words">
                  Add a House by clicking the button below!
                  <br />
                </p>
              )}
            </p>
          </div>
          
          <label
            htmlFor="new-house-modal"
            //className="btn btn-wide modal-button mt-10 mb-20"
            id="createHousehold"
            className="btn btn-wide btn-primary modal-button mt-10 normal-case text-base shadow-lg"
          >
            New House
                  </label>{/*
              <label htmlFor="new-house-modal"><NewHouseCard id="" name="" /></label>*/}
        </div>
        <div className="xl:order-3 xl:basis-1/3 flex-col justify-around items-center" id="userInvites">
          <UserInvites />
        </div>
        
        <div className="xl:order-1 xl:basis-1/3 mt-10">
          <h1 className="text-2xl px-10 font-semibold">
            Recent Activity
          </h1>
          <RecentActivityAgenda
            userHouseholds={userHouseholds}
          ></RecentActivityAgenda>
        </div>
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

