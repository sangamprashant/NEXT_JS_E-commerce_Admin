"use client";
import { signIn, signOut, useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button className="bg-white p-2 px-4 rounded-lg">
            Sign in with google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => signIn("google")}>SignIn</button>
    </div>
  );
};

export default page;
