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
      <div className="grid place-content-center px-10 py-10 shadow-lg w-max mx-auto mt-6">
        <h1 className="text-center font-black text-3xl mb-2">Sign Up using</h1>
        <div className="flex flex-col gap-y-3">
          <EmailPasswordAuthSignUp />
          <GoogleSignIn />
        </div>
      </div>
    );
  }
};

export default Signup;
