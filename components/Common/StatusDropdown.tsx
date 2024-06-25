import React, { useState, forwardRef } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type StatusDropdownProps = {
  setValue: (target: "status", value: string) => void;
  status: string;
  options: any;
};

const StatusDropdown = forwardRef<HTMLDivElement, StatusDropdownProps>(
  ({ setValue, status, options }, ref) => {
    return (
      <div className="relative">
        <div ref={ref} className="mt-1 w-full">
          <Select>
            <SelectTrigger className="w-[180px] capitalize">
              <SelectValue placeholder={status} />
            </SelectTrigger>

            <SelectContent style={{ zIndex: 100 }}>
              <SelectGroup>
                {options.map((option: any) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    onClick={() => {
                      setValue("status", option.value);
                    }}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }
);

export default StatusDropdown;
