import React, { useCallback, useContext } from "react";
import { useRouter } from "next/router";

import EmailPasswordAuthSignUp from "../components/emailPasswordAuthSignUp";

import { AuthContext } from "../context/AuthContext";

import GoogleSignIn from "../components/googleSignIn";

const Signup = () => {
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;

  const Router = useRouter();

  if (currentUser) {
    Router.push("/");
    return <></>;
  } else {
    return (
      <div className="flex-col content-center justify-center px-10 py-5 shadow-lg w-96 mx-auto mt-6 mb-4">
        <img src="./logo.png" alt="..." className="justify-center px-7"/>
        <h1 className="text-center text-3xl font-normal mb-2">Sign Up</h1>
        <div className="flex flex-col gap-y-1">
          <EmailPasswordAuthSignUp />
          <div className="divider text-sm mb-0">OR</div>
          <GoogleSignIn />
      </div>
  </div>
    );
  }
};

export default Signup;
