"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { fetchuserdata } from "@/Actions/useractions";
const Navbar = () => {
  const { data: session } = useSession();
  const [showdropdown, setShowdropdown] = useState(false);
  const [userinfo, setUserinfo] = useState({ });

  useEffect(() => {
    (async () => {
      if (session) {
        const userdata = await fetchuserdata(session.user.email);
        console.log("userdata", userdata);
        setUserinfo(userdata);
      }
    })();
  }, [session, showdropdown]);

  return (
    <nav className="flex justify-between bg-gray-900 text-white p-3">
      <div className="text-xl font-bold px-2">
        <Link href={"/"}>GetMAChai</Link>
      </div>
      <div className="pr-10 flex gap-2 items-center">
        {!session && (
          <Link href={"/Login"}>
            <button className="relative inline-flex items-center justify-center p-0.5  me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-4 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Login
              </span>
            </button>
          </Link>
        )}
        {session && (
          <div className="relative ">
            <button
              id="dropdownDividerButton"
              onClick={() => setShowdropdown(!showdropdown)}
              data-dropdown-toggle="dropdownDivider"
              className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onBlur={() => {
                setTimeout(() => {
                  setShowdropdown(false);
                }, 100);
              }}
            >
              {`Hey ${userinfo.username}`}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {/* <!-- Dropdown menu --> */}
            <div
              id="dropdownDivider"
              className={`z-10 ${
                showdropdown ? "block" : "hidden"
              } mt-2 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDividerButton"
              >
                <li>
                  <Link
                    href={`/${userinfo.username}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white "
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Edit Profile
                  </Link>
                </li>
              </ul>
              <div className="py-2">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  onClick={() => signOut()}
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        )}
        {/* <ul className="flex gap-3 text-lg">
          <li className="navbtn">Home</li>
          <li className="navbtn">Products</li>
          <li className="navbtn">About</li>
          <li className="navbtn">Contact</li>
        </ul> */}
      </div>
    </nav>
  );
};

export default Navbar;
