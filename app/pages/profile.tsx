import React, { useContext, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { auth, db, storage } from "../firebase/clientApp";
import { doc, updateDoc } from "firebase/firestore";

import AuthRoute from "../HOC/authRoute";

import { AuthContext } from "../context/AuthContext";

import NavBar from "../components/navBar";
import UserStats from "../components/userStats";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";

import { v4 } from "uuid";
import icon from '../public/defaultProfile.png'


function Profile() {
  const router = useRouter();
  const appContext = useContext(AuthContext);
  const userData = appContext?.userData;
  const [imageUpload, setImageUpload] = useState<File | null>();
  const [imageError, setImageError] = useState(false);
  const [user, userLoading, userError] = useAuthState(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  const usernameModalCheckboxRef = useRef<HTMLInputElement>(null);
  const imageModalCheckboxRef = useRef<HTMLInputElement>(null);

  const handleUsernameChange = async (event: any) => {
    event.preventDefault();
    const newUsername = event.target.elements.newUsername.value;
    if (user) {
      await updateProfile({
        displayName: newUsername,
      }).then(async () => {
        await updateDoc(doc(db, "users", user.uid), {
          "data.displayName": newUsername,
        });
      });
    }
    if (usernameModalCheckboxRef.current !== null) {
      usernameModalCheckboxRef.current.checked =
        !usernameModalCheckboxRef.current.checked;
    }
  };

  const handleImageUpload = (event: any) => {
    if (event.target.files) {
      if (event.target.files[0].size > 1000 * 1000) {
        setImageError(true);
      } else {
        setImageError(false);
        setImageUpload(event.target.files[0]);
      }
    }
  };

  // Handler that uploads user profile image and
  // updates user auth instance photoURL
  const handleImageSubmit = async (event: any) => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `profile/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(async () => {
      // Delete old profile pic
      if (user?.photoURL) {
        const oldImageRef = ref(storage, user?.photoURL);
        await deleteObject(oldImageRef);
      }
      // After new image is uploaded, change user display image
      if (appContext && appContext.currentUser) {
        const user = appContext.currentUser;
        const newPhotoLink = await getDownloadURL(imageRef);
        await updateProfile({
          photoURL: newPhotoLink,
        });
        await updateDoc(doc(db, "users", user.uid), {
          "data.photoURL": newPhotoLink,
        });
      }
    });
    if (imageModalCheckboxRef.current !== null) {
      imageModalCheckboxRef.current.checked =
        !imageModalCheckboxRef.current.checked;
    }
  };

  return (
    <AuthRoute>
      <NavBar></NavBar>
      <div className="flex flex-col xl:flex-row min-w-full place-content-center content-center px-5 py-5 gap-x-20 mx-auto pt-24">
        <div className="mt-4 flex xl:flex-col flex-row">
          <label htmlFor="imageUploadModal" className="modal-button">
            <div className="relative border-2 rounded-xl">
              {userError && <strong>Error: {JSON.stringify(userError)}</strong>}
              {userLoading && (
                <span className="btn loading btn-ghost place-item-center"></span>
              )}
              {user &&
                (updating ? (
                  <span className="btn loading btn-ghost place-item-center"></span>
                ) : (
                  <Image
                    className="rounded-xl avatar object-cover"
                    src={user?.photoURL || icon}
                    object-fit= "contain"
                    height={200}
                    width={200}
                    alt="profile pic"
                  />
                ))}
              {updateError && (
                <strong>Error: {JSON.stringify(userError)}</strong>
              )}
              <div className="absolute top-0 left-0 w-full h-full bg-white rounded-xl opacity-0 flex justify-center items-center transition-opacity hover:opacity-50 duration-500">
                <Image
                  className=""
                  src="/accountCircle.png"
                  height={50}
                  width={50}
                  alt="uploadIcon"
                />
              </div>
            </div>
          </label>
          <div className="mt-5 flex flex-col mx-auto">
            {userError && <strong>Error: {JSON.stringify(userError)}</strong>}
            {userLoading}
            {user &&
              (updating ? (
                <span className="btn loading btn-ghost place-item-center"></span>
              ) : (
                <h3 className="text-4xl font-bold break-words w-48" id="profileUsername">
                  {user.displayName}
                </h3>
              ))}
            <label
              htmlFor="usernameChangeModal"
              className="btn btn-xs btn-outline modal-button mt-2"
            >
              edit
            </label>
          </div>
        </div>
        <div className="mt-4">
          <div className="rounded-xl border shadow-lg p-10 h-fit mb-10">
            <h2 className="text-2xl font-bold">User Profile</h2>
            <br />
            <div className="grid grid-cols-2 gap-x-5">
              <h3 className="font-bold">Email Address:</h3>
              <p className="break-words" id="profileEmail">{user?.email}</p>
              <h3 className="font-bold">Authentication Method:</h3>
              <p id="profileAuth">
                {userData?.userProviderId === "password" ? "Email" : "Google"}
              </p>
            </div>
          </div>
          <UserStats />
        </div>
      </div>

      <input
        type="checkbox"
        id="usernameChangeModal"
        className="modal-toggle"
        ref={usernameModalCheckboxRef}
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
              placeholder={user?.displayName || "Enter your display name here!"}
              className="input input-bordered w-full max-w-xs"
              maxLength={20}

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

      <input
        type="checkbox"
        id="imageUploadModal"
        className="modal-toggle"
        ref={imageModalCheckboxRef}
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="imageUploadModal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="flex flex-col">
            <h3 className="text-lg font-bold">Upload your Profile Picture!</h3>
            <div className=" border-4 rounded-lg my-5 w-50 h-50 place-self-center justify-self-center">
              {imageUpload && (
                <Image
                  src={URL.createObjectURL(imageUpload)}
                  alt="No image"
                  height={50}
                  width={50}
                ></Image>
              )}
            </div>
            {imageError && (
              <div className="alert alert-error shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="stroke-current flex-shrink-0 w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>
                    File size is too big! &#40;Ensure it is less than 1MB&#41;
                  </span>
                </div>
              </div>
            )}
            <input
              type="file"
              onChange={handleImageUpload}
              className=""
              accept=".png,.jpg,.jpeg"
            />
            <button onClick={handleImageSubmit} className="btn mt-10">
              Upload
            </button>
          </div>
        </div>
      </div>
    </AuthRoute>
  );
}

export default Profile;
