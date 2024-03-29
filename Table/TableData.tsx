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
} from "@tanstack/react-table";

type TableDataProps = {
  data: any;
  columns: any;
};

const TableData: React.FC<TableDataProps> = ({ data, columns }) => {
  const { getRowModel, getHeaderGroups } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Table>
      <TableCaption className="pb-4">Website</TableCaption>
      <TableHeader>
        {getHeaderGroups().map((headerGroup, index) => (
          <TableRow key={index}>
            {headerGroup.headers.map((header, index) => (
              <TableHead key={index} className={`text-gray-500 font-semibold`}>
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
        {getRowModel().rows.map((row, index) => (
          <TableRow key={index}>
            {row.getVisibleCells().map((cell, index) => (
              <TableCell key={index} className={`text-gray-700 `}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableData;
