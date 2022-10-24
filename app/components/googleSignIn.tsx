/* eslint-disable @next/next/no-img-element */
import React, { useCallback } from "react";
import { useRouter } from "next/router";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/clientApp";
import Image from "next/image";

const GoogleSignIn = () => {
  const Router = useRouter();

  const loginHandler = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    // additional scopes can be added as per requirement

    try {
      await signInWithPopup(auth, provider);
      Router.push("/");
    } catch (error) {
      console.log("error");
      alert(error);
    }
  }, [Router]);
  return (
    <button className="btn-lg" onClick={loginHandler}>
      <div className="flex items-center justify-center">
        <Image
          src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png"
          alt="google"
          width="50"
          height="50"
        />
        <h3 className="ml-4 text-blue-600 text-sm font-semibold  my-auto ">
          Continue with Google
        </h3>
      </div>
    </button>
  );
};

export default GoogleSignIn;
