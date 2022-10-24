import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../firebase/clientApp";
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";

import Link from "next/link";
import { updateDoc, doc } from "firebase/firestore";

const EmailPasswordAuthSignUp = () => {
  const Router = useRouter();

  const signupHandler = useCallback(
    async (event: any) => {
      event.preventDefault();
      const { email, password, displayName } = event.target.elements;
      try {
        await createUserWithEmailAndPassword(auth, email.value, password.value)
          //Update Display name for firebase auth account and firestore user document
          .then(async (user) => {
            await updateProfile(user.user, {
              displayName: displayName.value,
            });
            await updateDoc(doc(db, "users", user.user.uid), {
              "data.displayName": displayName.value,
            });
          })
          .catch((error) => {
            console.log(error);
          });
        Router.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [Router]
  );

  return (
    <div>
      <form
        onSubmit={signupHandler}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="form-control w-full max-w-md mb-4">
          <label
            className="label text-grey-700t text-sm font-bold mb-2"
            htmlFor="displayName"
          >
            Display Name
          </label>
          <input
            className="input input-bordered w-full max-w-xs"
            name="displayName"
            id="displayName-signup"
            type="text"
            placeholder="Display Name"
            required
          />
        </div>
        <div className="form-control w-full max-w-md mb-4">
          <label
            className="label text-grey-700t text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="input input-bordered w-full max-w-xs"
            name="email"
            id="email-signup"
            type="email"
            placeholder="email"
          />
        </div>
        <div className="form-control w-full max-w-md mb-6">
          <label
            className="label text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="input input-bordered max-w-xs shadow appearance-none border rounded w-full"
            name="password"
            id="password-signup"
            type="password"
            placeholder="******************"
          />
        </div>
        <button
          className="btn btn-primary btn-wide transition-all duration-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign Up
        </button>
        <br />
        <Link href="/login">
          <a className="link link-primary link-hover transition-all duration-500">
            Login ?
          </a>
        </Link>
      </form>
    </div>
  );
};

export default EmailPasswordAuthSignUp;
