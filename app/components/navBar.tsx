/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/clientApp";
import Image from "next/image";
import Link from "next/link";

import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const appContext = useContext(AuthContext);

  const signOutHandler = async () => {
    await signOut(auth);
    document.location.reload();
  };

  return (
    <div className="navbar bg-base-100 shadow h-max absolute">
      <div className="flex-1 ">
      <Image
          src={"/logo.png"}
          width={50}
          height={50}
          alt="Shoes"
          className="rounded-r-xl object-cover shadow-md"
        />
        <Link href="/">
          
          <a className="btn btn-ghost normal-case text-3xl px-2 h-max rounded-2xl">U-Time</a>
        </Link>
      </div>
      <div className="flex flex-row gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost h-max rounded-2xl w-max">
            
            <div className="w-11">{/*make user profile pic*/}
              <Image
                className="rounded-full avatar"
                src={
                  appContext?.userData?.userPhotoLink ||
                  "https://placeimg.com/80/80/people"
                }
                height={80}
                width={80}
                alt="profile pic"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-48"
          >
            <li>
              <Link href="/profile">
                <a className="justify-between text-base">
                  Profile
                  <span className="badge">New</span>
                </a>
              </Link>
            </li>
            <li>
              <a onClick={signOutHandler}
                className="justify-between text-base">
                  Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;