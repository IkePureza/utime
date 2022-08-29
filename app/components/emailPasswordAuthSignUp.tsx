import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase/clientApp";
import { createUserWithEmailAndPassword } from "firebase/auth";

import Link from "next/link";

const EmailPasswordAuthSignUp = () => {
  const Router = useRouter();

  const signupHandler = useCallback(
    async (event: any) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        console.log(email.value, password.value);
        await createUserWithEmailAndPassword(auth, email.value, password.value);
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
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="input input-bordered w-full max-w-xs"
            name="email"
            id="email"
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
            id="password"
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
