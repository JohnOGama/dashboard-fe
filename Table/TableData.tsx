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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

type TableDataProps = {
  data: any;
  columns: any;
  onError?: boolean;
  errorMessage?: string;
};

const TableData: React.FC<TableDataProps> = ({ data, columns }) => {
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
    <div className="relative h-[70vh] flex flex-col">
      <div className="flex-grow overflow-auto">
        <Table className="min-w-full">
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
          <TableBody>
            {getRowModel()?.rows?.map((row, index) => (
              <TableRow key={index}>
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell key={index} className="text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-white p-2">
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
