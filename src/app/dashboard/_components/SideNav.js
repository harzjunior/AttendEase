"use client";

import { GraduationCap, Hand, LayersIcon, User } from "lucide-react";
import Avatar from "./common/Avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./common/Logo";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

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
      name: "profile",
      icon: User,
      path: "/dashboard/profile",
    },
  ];

  //to keep track of nav elements/items active position
  const path = usePathname();

  return (
    <div className="border shadow-md h-screen p-5">
      <div className="flex justify-center bg-slate-100 shadow-md">
        <Logo />
      </div>
      <hr className="my-5"></hr>

      {menuList.map((menu, index) => (
        <Link key={index} href={menu.path}>
          <h2
            className={`${
              path == menu.path && "text-slate-500 bg-primary"
            } flex items-center text-center gap-3 p-4 my-1 text-slate-500 hover:bg-primary cursor-pointer rounded-lg`}
          >
            <menu.icon />
            {menu.name}
          </h2>
        </Link>
      ))}

      {/* user avatar */}
      <div className=" bottom-5 fixed">
        <Menubar className="bg-[#f5f5f5] w-[fit-content] py-5">
          <MenubarMenu>
            <MenubarTrigger className="text-left">
              <Avatar bool={true} avClass="flex space-x-2" />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Avatar
                  bool={true}
                  avClass="flex gap-2 items-center bottom-5 p-2"
                />
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset className="cursor-pointer">
                Account details
              </MenubarItem>
              <MenubarItem inset>
                <LogoutLink>Sign out</LogoutLink>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
}

export default SideNav;
