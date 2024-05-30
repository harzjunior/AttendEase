"use client";
import React, { useState } from "react";
import Header from "./Header";
import SideNav from "./SideNav";

function DashboardLayout({ children }) {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const handleToggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <div className="flex h-screen">
      <SideNav isOpen={isSideNavOpen} onClose={handleToggleSideNav} />
      <div className="flex-1 flex flex-col">
        <Header onToggleSideNav={handleToggleSideNav} />
        <main className="p-4 flex-grow">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
