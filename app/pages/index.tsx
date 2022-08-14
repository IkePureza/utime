import React, { useContext } from "react";
import Image from "next/image";

import { auth, db } from "../firebase/clientApp";
import { signOut } from "firebase/auth";
import { collection, addDoc, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import AuthRoute from "../HOC/authRoute";

import { AuthContext } from "../context/AuthContext";
import Link from "next/link";

function Index() {
  const appContext = useContext(AuthContext);
  const userData = appContext?.userData;
  const [value, loading, error] = useCollection(
    query(
      collection(db, "household"),
      where("users", "array-contains", userData?.userId)
    )
  );
  console.log(JSON.parse(JSON.stringify(userData)));

  const signOutHandler = async () => {
    await signOut(auth);
  };

  const handleCreateHousehold = async (event: any) => {
    event.preventDefault();
    const { name } = event.target.elements;
    const docRef = await addDoc(collection(db, "household"), {
      name: name.value,
      users: [userData?.userId],
    });
    console.log("Document written with ID: ", docRef.id);
  };

  return (
    <AuthRoute>
      <div>
        <h1 className="text-8xl text-center font-black">Home</h1>
        <button
          className="text-center p-3 border-2 bg-gray-800 text-white rounded-lg mx-auto block mt-10"
          onClick={signOutHandler}
        >
          Sign out
        </button>
        <form
          onSubmit={handleCreateHousehold}
          className="bg-slate-200 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Household name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="name"
              id="name"
            ></input>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="transition-all duration-500 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create household
            </button>
          </div>
        </form>
        <h1 className="text-4xl mb-4 text-center">Your Households</h1>
        <div>
          <p>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Collection: Loading...</span>}
            {value && (
              <div className="flex flex-col justify-around items-center">
                {value.docs.map((doc) => (
                  <React.Fragment key={doc.id}>
                    <div className="justify-center flex-1 block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                      <Link href="household/[id]" as={`household/${doc.id}`}>
                        <a className="mb-2 text-2xl  font-bold tracking-tight text-gray-900 dark:text-white">
                          {doc.data().name}
                        </a>
                      </Link>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            )}
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-y-2">
          <div className="flex gap-x-3 items-center justify-center">
            <h4>Authentication method:</h4>
            <h6>{userData?.userProviderId}</h6>
          </div>
          <div className="flex gap-x-3 items-center justify-center">
            <h4>userId:</h4>
            <h6>{userData?.userId}</h6>
          </div>
          <div className="flex gap-x-3 items-center justify-center">
            <h4>display name:</h4>
            <h6>{userData?.userName || "null"}</h6>
          </div>
          <div className="flex gap-x-3 items-center justify-center">
            <h4>email:</h4>
            <h6>{userData?.userEmail}</h6>
          </div>
          <div className="flex gap-x-3 items-center justify-center">
            <h4>Profile picture</h4>
            {userData?.userPhotoLink ? (
              <Image
                className="rounded-full object-contain w-32 h-32"
                src={userData?.userPhotoLink}
                alt={userData?.userName ?? ""}
                width="32"
                height="32"
              />
            ) : (
              "null"
            )}
          </div>
        </div>
      </div>
    </AuthRoute>
  );
}

export default Index;
