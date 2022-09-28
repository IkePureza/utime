/* eslint-disable @next/next/no-img-element */
import React, { useCallback } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/clientApp";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  const signOutHandler = async () => {
    await signOut(auth);
  };
  return (
    <div className="navbar bg-base-100 shadow h-max">
      <div className="flex-1">
        <Link href="/">
          <a className="btn btn-ghost normal-case text-5xl px-5 py-2 h-max rounded-2xl">U-Time</a>
        </Link>
      </div>
      <div className="flex flex-row gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost h-max rounded-2xl w-max">
            
            <div className="w-16">
              <Image
                className="rounded-full avatar"
                src="https://placeimg.com/150/150/people"
                height={150}
                width={150}
                alt="profile pic"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-72"
          >
            <li>
              <a className="justify-between text-3xl">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a className="justify-between text-3xl">
                Settings
              </a>
            </li>
            <li>
              <a onClick={signOutHandler}
                className="justify-between text-3xl">
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

/*
removed:
<svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            from under:
                      <label tabIndex={0} className="btn btn-ghost">

*/