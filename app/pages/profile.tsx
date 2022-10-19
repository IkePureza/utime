import React, { useContext } from "react";
import Image from "next/image";

import { db } from "../firebase/clientApp";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

import AuthRoute from "../HOC/authRoute";

import { AuthContext } from "../context/AuthContext";

import NavBar from "../components/navBar";

function Profile() {
  const appContext = useContext(AuthContext);
  const userData = appContext?.userData;

  const handleUsernameChange = async (event: any) => {
    const newUsername = event.target.elements.newUsername.value;
    if (appContext && appContext.currentUser) {
      const user = appContext.currentUser;
      await updateProfile(user, {
        displayName: newUsername,
      });
      await updateDoc(doc(db, "users", user.uid), {
        "data.displayName": newUsername,
      });
    }
  };

  return (
    <AuthRoute>
      <NavBar></NavBar>
      <div className="flex flex-row max-h-screen min-w-full place-content-center px-5 py-5 gap-x-20 mx-auto">
        <div className="mt-4 flex flex-col">
          <Image
            className="rounded-xl avatar"
            src={userData?.userPhotoLink || "https://placeimg.com/80/80/people"}
            height={200}
            width={200}
            alt="profile pic"
          />
          <div className="mt-5 flex flex-row items-end justify-between">
            {userData && userData.userName ? (
              <h3 className="text-4xl font-bold">{userData.userName}</h3>
            ) : (
              <h3 className="text-xl font-bold text-red-500">
                Display Name not set!
              </h3>
            )}
            <label
              htmlFor="usernameChangeModal"
              className="btn btn-xs btn-outline modal-button mb-1"
            >
              edit
            </label>
          </div>
        </div>
        <div className="rounded-xl border shadow-xl p-10 mt-4 h-1/2">
          <h2 className="text-2xl font-bold">User Profile</h2>
          <br />
          <div className="grid grid-cols-2 gap-x-5">
            <h3 className="font-bold">Email Address:</h3>
            <p>{userData?.userEmail}</p>
            <h3 className="font-bold">Authentication Method:</h3>
            <p>
              {userData?.userProviderId === "password" ? "Email" : "Google"}
            </p>
          </div>
        </div>
      </div>

      <input
        type="checkbox"
        id="usernameChangeModal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Enter your new display name!</h3>
          <p className="text-xs">(This name will be visible to other users!)</p>
          <br />
          <form action="/profile" onSubmit={handleUsernameChange}>
            <input
              type="text"
              id="newUsername"
              placeholder={
                userData?.userName || "Enter your display name here!"
              }
              className="input input-bordered w-full max-w-xs"
            />
            <div className="modal-action">
              <label
                htmlFor="usernameChangeModal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <label htmlFor="usernameChangeModal">
                <button type="submit" className="btn">
                  Change
                </button>
              </label>
            </div>
          </form>
        </div>
      </div>
    </AuthRoute>
  );
}

export default Profile;
