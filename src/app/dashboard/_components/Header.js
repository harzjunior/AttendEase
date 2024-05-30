"use client";

import { Menu } from "lucide-react";
import Avatar from "./common/Avatar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GraduationCap, Hand, LayersIcon, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/common/ModeToggle";
import { useUser } from "@/context/UserContext";

function Header() {
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

  //to keep track of nav elements/items active position
  const path = usePathname();
  const { user } = useUser();

  return (
    <div
      className={`flex border p-4 shadow-sm items-center gap-2 justify-between md:justify-end`}
    >
      <div className="md:hidden block">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <Menu />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Link href="/" className="flex justify-center w-full">
                  <Image
                    src={"/logo.svg"}
                    height={100}
                    width={50}
                    alt="logo"
                    priority
                  />
                </Link>
              </MenubarItem>
              <MenubarSeparator />

              {menuList.map((menu, index) => (
                <Link key={index} href={menu.path}>
                  <h2
                    className={`${
                      path == menu.path && "text-slate-500"
                    } flex items-center text-center gap-3 p-3 my-1 text-slate-500 cursor-pointer rounded-lg`}
                  >
                    <menu.icon />
                    <MenubarItem
                      className={`${
                        path == menu.path && "bg-primary hover:bg-primary"
                      } `}
                    >
                      {menu.name}
                    </MenubarItem>
                    <MenubarSeparator />
                  </h2>
                </Link>
              ))}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              {user?.picture ? (
                <Image
                  src={user.picture}
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              ) : (
                <Image
                  src={"/images/Kyrian.png"}
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Avatar
              bool={true}
              avClass="flex gap-2 items-center bottom-5 p-2"
            />
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuItem>Account details</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutLink>Logout</LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ModeToggle />
    </div>
  );
}

export default Header;
