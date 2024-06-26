"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import General from "./Menu/General";
import User from "./Menu/User";
import Actions from "./Menu/Actions";
import useAuthStore from "@/store/useAuthStore";

const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useAuthStore((state) => state);
  if (pathname === "/login") {
    return null;
  }
  return (
    <div className="w-[230px] h-screen relative px-5 py-4 border">
      <h1 className="my-6 font-semibold text-xl text-gray-700">{user.name}</h1>
      {/* <div className="flex items-center border px-4 rounded-lg ">
        <Search className="text-gray-500" size={18} />
        <Input className="border-none text-gray-500 text-xs h-0 py-4" />
      </div> */}
      <General />
      <User />
      {/* <Actions /> */}
    </div>
  );
};

export default Sidebar;
