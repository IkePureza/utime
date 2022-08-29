import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import EmailPasswordAuthLogin from "../components/emailPasswordAuthLogin";
import GoogleSignIn from "../components/googleSignIn";

const Login = () => {
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;
  const Router = useRouter();

  if (currentUser) {
    Router.push("/");
    return <></>;
  } else {
    return (
      <div className="grid place-content-center px-10 py-10 shadow-lg w-max mx-auto mt-6">
        <h1 className="text-center font-black text-3xl mb-2">Login</h1>
        <div className="flex flex-col gap-y-3">
          <EmailPasswordAuthLogin />
          <div className="divider">OR</div>
          <GoogleSignIn />
        </div>
      </div>
    );
  }
};

export default Login;
