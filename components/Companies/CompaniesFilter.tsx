import React from "react";
import { Filter, LucideFilter } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CompanyFilter } from "@/utils/staticData";
import { Input } from "../ui/input";
import AddCompany from "@/Table/Actions/Company/AddCompany";

const CompaniesFilter = () => {
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
              {CompanyFilter.users.map((status, index) => (
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
              {CompanyFilter.status.map((status, index) => (
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
              {CompanyFilter.subscriptionType.map((status, index) => (
                <h1 key={index} className=" capitalize cursor-pointer">
                  {status}
                </h1>
              ))}
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <AddCompany />
    </div>
  );
};

export default CompaniesFilter;
