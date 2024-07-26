import SideBar from "@/components/hackathon-sidebar/index";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <main>
      <SideBar />
      {children}</main>
    </>
  );
}
