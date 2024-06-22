import React from "react";
import { Filter, LucideFilter } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { UserDropdown } from "@/utils/staticData";
import AddUser from "@/Table/Actions/User/AddUser";
import { Input } from "../ui/input";

const UserPopover = () => {
  return (
    <div className="flex justify-between items-center w-full ">
      <div className="flex items-center gap-5">
        <Input
          placeholder="Search"
          className="w-fit"
          // value={test}
          // onChange={(e) => setTest(e.target.value)}
        />
        <div className="flex gap-4">
          <Popover>
            <PopoverTrigger>
              <div className="text-sm font-medium  flex gap-2 items-center border-2 border-blue-500 rounded-md py-1 px-2">
                <h1 className="text-blue-500">Status</h1>
                <Filter className="text-blue-500" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              {UserDropdown.status.map((status, index) => (
                <h1 key={index} className=" capitalize cursor-pointer">
                  {status}
                </h1>
              ))}
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>
              <div className="text-sm font-medium  flex gap-2 items-center border-2 border-orange-500 rounded-md py-1 px-2">
                <h1 className="text-orange-500">Role</h1>
                <Filter className="text-orange-500" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              {UserDropdown.role.map((status, index) => (
                <h1 key={index} className=" capitalize cursor-pointer">
                  {status}
                </h1>
              ))}
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>
              <div className="text-sm font-medium  flex gap-2 items-center border-2 border-pink-500 rounded-md py-1 px-2">
                <h1 className="text-pink-500">User type</h1>
                <LucideFilter className="text-pink-500" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              {UserDropdown.userType.map((status, index) => (
                <h1 key={index} className=" capitalize cursor-pointer">
                  {status}
                </h1>
              ))}
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <AddUser />
    </div>
  );
};

export default UserPopover;
