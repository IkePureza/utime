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
        className="bg-white shadow-md rounded px-8 pt-3 pb-4"
      >
        <div className="form-control w-full max-w-md">
          <label
            className="label text-grey-700 text-base font-semibold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="input input-bordered w-full text-xs rounded-lg h-8"            name="email"
            id="email"
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
            id="password"
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

