"use client";
import { Nav } from "@components";
import { signIn, signOut, useSession } from "next-auth/react";

const SideNav = ({children}) => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            className="bg-white p-2 px-4 rounded-lg"
            onClick={() => signIn("google")}
          >
            Sign in with google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-blue-900 min-h-screen flex">
      <Nav />
      <div className="bg-white flex flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">{children}</div>
    </div>
  );
};

export default SideNav;
