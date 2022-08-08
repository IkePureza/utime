import React, { Component, useEffect, useState } from "react";
import { auth } from "../firebase/clientApp";
import { onAuthStateChanged, User } from "firebase/auth";

export interface userDataType {
  userProviderId: string;
  userId: string;
  userName: string | null;
  userEmail: string | null;
  userPhotoLink?: string | null;
}

export interface AppContextInterface {
  currentUser?: User;
  userData?: userDataType;
}

export const AuthContext = React.createContext<AppContextInterface | null>(
  null
);

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<userDataType>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const requiredData: userDataType = {
          userProviderId: user.providerData[0].providerId,
          userId: user.uid,
          userName: user.displayName,
          userEmail: user.email,
          userPhotoLink: user.photoURL,
        };

        setUserData(requiredData);
        setCurrentUser(user);
      } else {
        setCurrentUser(undefined);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
