"use client";
import { Nav, SideNav } from "@components";
import { signIn, signOut, useSession } from "next-auth/react";

const page = () => {
  return (
    <SideNav>Admin Home</SideNav>
  );
}

export default page
