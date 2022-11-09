/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/clientApp";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const appContext = useContext(AuthContext);
  const router = useRouter();

  const signOutHandler = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl">UTime</a>
        </Link>
      </div>
      <div className="flex flex-row gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 mr-1"
              id="hamburger"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <div className="w-10">
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
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/profile">
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <a onClick={signOutHandler}>Logout</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
