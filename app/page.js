"use client";
import { signIn, signOut, useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button className="bg-white p-2 px-4 rounded-lg" onClick={()=>signIn("google")}>
            Sign in with google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => signOut()}>signOut</button>
    </div>
  );
};

export default page;
