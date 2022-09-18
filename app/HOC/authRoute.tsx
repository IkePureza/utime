import React, { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";

const AuthRoute = ({ children }: any) => {
  const authContext = useContext(AuthContext);
  const Router = useRouter();

  if (authContext?.currentUser) {
    return <>{children}</>;
  } else {
    Router.push("/login");
    return <></>;
  }
};

export default AuthRoute;
