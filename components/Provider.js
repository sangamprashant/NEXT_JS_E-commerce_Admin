"use client";
import React from 'react'
import {SessionProvider} from "next-auth/react"
import SideNav from './SideNav';

const Provider = ({children}) => {
  return (
    <SessionProvider>
          {children}
    </SessionProvider>
  )
}

export default Provider
