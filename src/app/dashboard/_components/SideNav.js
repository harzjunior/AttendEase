"use client";

import { GraduationCap, Hand, LayersIcon, Settings } from "lucide-react";
import Image from "next/image";
import React from "react";
import Avatar from "./common/Avatar";
import Link from "next/link";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayersIcon,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Students",
      icon: GraduationCap,
      path: "/dashboard/students",
    },
    {
      id: 3,
      name: "Attendance",
      icon: Hand,
      path: "/dashboard/attendance",
    },
    {
      id: 4,
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  return (
    <div className="border shadow-md h-screen p-5">
      <Image src={"/logo.svg"} height={180} width={50} alt="logo" priority />
      <hr className="my-5"></hr>

      {menuList.map((menu, index) => (
        <Link key={index} href={menu.path}>
          <h2 className="flex items-center text-center gap-3 p-4 text-slate-500 hover:bg-primary cursor-pointer rounded-lg">
            <menu.icon />
            {menu.name}
          </h2>
        </Link>
      ))}

      {/* user avatar */}
      <Avatar
        bool={true}
        avClass="flex gap-2 items-center bottom-5 fixed p-2"
      />
    </div>
  );
}

export default SideNav;
