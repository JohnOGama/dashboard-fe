"use client";
import { Badge } from "@/components/ui/badge";

import CardData from "@/components/Dashboard/CardData";
import { Card } from "@/components/ui/card";
import TableData from "@/Table/TableData";

import useFetch from "@/lib/useFetch";

import Link from "next/link";

import { Input } from "@/components/ui/input";

import AddUser from "@/Table/Users/AddUser";
import DeleteUser from "@/Table/Users/DeleteUser";
import EditUser from "@/Table/Users/EditUser";

import data1 from "@/MOCK_DATA/Users.json";
import PaginationBtn from "@/Table/Pagination";

const Users = ({ hasHeader = true }) => {
  const { loading, data, refetchData } = useFetch("user", "/get-all-user");

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ getValue }: any) => (
        <Link href={`${getValue()}`} className="text-gray-500 font-medium">
          {getValue()}
        </Link>
      ),
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: ({ getValue }: any) => (
        <Link href={`${getValue()}`} className="text-gray-500 font-medium">
          {getValue()}
        </Link>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (props: any) => {
        return (
          <>
            {props.getValue() === "active" ? (
              <Badge className="bg-green-500 hover:bg-green-500/90">
                {props.getValue()}
              </Badge>
            ) : (
              <Badge className="bg-red-500 hover:bg-red-500/90">
                {props.getValue()}
              </Badge>
            )}
          </>
        );
      },
    },

    {
      header: "Job role",
      accessorKey: "role",
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      // cell: (props: any) => <h1>{dateFormatter(props.getValue())}</h1>,
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: (props: any) => (
        <div className="flex gap-3">
          {/* <EditWebsite props={props} refreshData={refetchData} /> */}
          <EditUser props={props} refreshData={refetchData} />
          <DeleteUser props={props} refreshData={refetchData} />
        </div>
      ),
    },
  ];

  return (
    <div className="">
      {hasHeader ? (
        <div>
          <h1>Dashboard</h1>
          <div className="my-5 flex gap-5">
            <CardData label="Active Users" />
            <CardData label="Pending Users" />
            <CardData label="Total Users" />
          </div>
        </div>
      ) : null}

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <Input placeholder="Search" className="w-fit" />
            <AddUser refreshData={refetchData} />
          </div>
          <Card>
            <TableData columns={columns} data={data1} />
            <PaginationBtn />
          </Card>
        </div>
      )}
    </div>
  );
};

export default Users;
