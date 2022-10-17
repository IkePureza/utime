import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import Image from "next/image";

interface userInviteProps {}

export default function UserProfile(props: userInviteProps) {
  const appContext = useContext(AuthContext);
  const userData = appContext?.userData;

  return (
    <div className="mt-4 flex flex-col gap-y-2">
      <div className="flex gap-x-3 items-center justify-center">
        <h4>Authentication method:</h4>
        <h6>{userData?.userProviderId}</h6>
      </div>
      <div className="flex gap-x-3 items-center justify-center">
        <h4>userId:</h4>
        <h6>{userData?.userId}</h6>
      </div>
      <div className="flex gap-x-3 items-center justify-center">
        <h4>display name:</h4>
        <h6>{userData?.userName || "null"}</h6>
      </div>
      <div className="flex gap-x-3 items-center justify-center">
        <h4>email:</h4>
        <h6>{userData?.userEmail}</h6>
      </div>
      <div className="flex gap-x-3 items-center justify-center">
        <h4>Profile picture</h4>
        {userData?.userPhotoLink ? (
          <Image
            className="rounded-full object-contain w-32 h-32"
            src={userData?.userPhotoLink}
            alt={userData?.userName ?? ""}
            width="32"
            height="32"
          />
        ) : (
          "null"
        )}
      </div>
    </div>
  );
}
