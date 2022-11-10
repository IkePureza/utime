import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../firebase/clientApp";
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";

import Link from "next/link";
import { updateDoc, doc, getDoc } from "firebase/firestore";

const EmailPasswordAuthSignUp = () => {
  const Router = useRouter();

  const signupHandler = useCallback(
    async (event: any) => {
      event.preventDefault();
      const { email, password, displayName } = event.target.elements;
      try {
        createUserWithEmailAndPassword(auth, email.value, password.value)
          .then(async (user) => {
            //Update Display name for firebase auth account and firestore user document
            await updateProfile(user.user, {
              displayName: displayName.value,
            });

            const userRef = doc(db, "users", user.user.uid);

            async function waitUserDoc() {
              const userDoc = await getDoc(userRef);
              if (!userDoc.exists()) {
                window.setTimeout(waitUserDoc, 100);
              } else {
                await updateDoc(userRef, {
                  "data.displayName": displayName.value,
                });
              }
            }
            await waitUserDoc();
            Router.push("/");
          })
          .catch((error) => {
            console.log(error);
          });
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
        className="bg-white shadow-md rounded px-8 pt-3 pb-4"
      >
        <div className="form-control w-full max-w-md">
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
            maxLength={20}
            required
          />
        </div>
        <div className="form-control w-full max-w-md mb-4">
          <label
            className="label text-grey-700t text-sm font-bold mb-2"
            //className="label text-grey-700 text-base font-semibold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="input input-bordered w-full text-xs rounded-lg h-8"
            name="email"
            id="email-signup"
            type="email"
            placeholder="email"
          />
        </div>

        <div className="form-control w-full max-w-md mb-4">
          <label
            className="label text-gray-700 text-base font-semibold"
            htmlFor="password"
            
          >
            Password
          </label>
          <input
            className="input input-bordered shadow appearance-none w-full text-xs rounded-lg h-8"
            name="password"
            id="password-signup"
            type="password"
            placeholder="*************"
          />
        </div>
        <button
          className="btn btn-primary transition-all duration-500 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full mb-1 text-sm"
          type="submit"
        >
          Sign Up
        </button>
        <br />
        <Link href="/login">
          <a className="link link-primary link-hover transition-all duration-500 text-sm">
            Login ?
          </a>
        </Link>
      </form>
    </div>
  );
};

export default EmailPasswordAuthSignUp;

