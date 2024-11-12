"use client";

import React, { Fragment, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Navbar2 from "../../components/Navbar2/Navbar2";
import PageTitle from "../../components/pagetitle/PageTitle";
import Footer from "../../components/footer/Footer";
import Scrollbar from "../../components/scrollbar/scrollbar";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Profile = () => {
  const { data: session, status } = useSession();
  const [error, setError] = useState(null);

  const {
    data,
    error: swrError,
    isValidating,
  } = useSWR(
    session?.user?.email
      ? `/api/userBalance?email=${session.user.email}`
      : null,
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 30000, // Revalidate every 30 seconds
    }
  );

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (swrError) {
    setError(swrError.message);
  }

  return (
    <Fragment>
      <Navbar2 />
      {session?.user?.email && (
        <div className="container mx-auto p-4 min-h-[50vh] flex flex-col justify-center items-center">
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={"/images/vecteezy_simple-user-default-icon_24983914.png"}
                  alt="Profile Picture"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h2 className="text-2xl font-bold">{session.user.name}</h2>
                  <p className="text-gray-600">{session.user.email}</p>
                </div>
              </div>
              <button
                onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
                className="theme-btn text-black md:text-[14px] md:py-[8px] md:px-[22px] whitespace-nowrap"
              >
                Sign Out
              </button>
            </div>

            <div className="mt-6 flex">
              <h3 className="text-3xl ">
                Your Balance is
                <span className="font-bold">{`: ${
                  data?.balance ? data.balance : 0
                }`}</span>
              </h3>
            </div>
          </div>
        </div>
      )}
      {/* <Footer /> */}
      <Scrollbar />
    </Fragment>
  );
};

export default Profile;
