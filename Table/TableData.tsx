import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  RowModel,
  HeaderGroup,
  TableState,
} from "@tanstack/react-table";
import PaginationBtn from "./Pagination";

import { Input } from "@/components/ui/input";
import AddUser from "./Actions/User/AddUser";
import { Card } from "@/components/ui/card";
import UserPopover from "@/components/Users/UserDropdown";
import CompaniesFilter from "@/components/Companies/CompaniesFilter";

type TableDataProps = {
  data: any;
  columns: any;
  onError?: boolean;
  errorMessage?: string;
  UserDropdown?: boolean;
  CompaniesDropdown?: boolean;
};

const TableData: React.FC<TableDataProps> = ({
  data,
  columns,
  UserDropdown = false,
  CompaniesDropdown = false,
}) => {
  const {
    getRowModel,
    getHeaderGroups,
    getCanNextPage,
    getCanPreviousPage,
    nextPage,
    previousPage,
    getState,
    getTotalSize,
  } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { pageIndex } = getState().pagination;

  return (
    <div className="relative h-[80vh]">
      <div className="flex">
        {UserDropdown && <UserPopover />}
        {CompaniesDropdown && <CompaniesFilter />}
      </div>
      <Card className="mt-4 flex flex-col">
        <div className="flex-1 overflow-y-auto h-[100vh] ">
          <Table className="min-w-full ">
            <TableHeader>
              {getHeaderGroups().map((headerGroup, index) => (
                <TableRow key={index}>
                  {headerGroup.headers.map((header, index) => (
                    <TableHead
                      key={index}
                      className="text-gray-500 font-semibold"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="h-[20px]">
              {getRowModel().rows.map((row, index) => (
                <TableRow key={index}>
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell key={index} className="text-gray-700">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
      <div className="= right-0 mb-5 mr-5">
        <PaginationBtn
          getCanNextPage={getCanNextPage}
          getCanPreviousPage={getCanPreviousPage}
          nextPage={nextPage}
          pageIndex={pageIndex}
          previousPage={previousPage}
        />
      </div>
    </div>
  );
};

export default TableData;
