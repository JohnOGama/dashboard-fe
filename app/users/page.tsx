"use client";

import { Badge } from "@/components/ui/badge";
import CardData from "@/components/Dashboard/CardData";
import { Card } from "@/components/ui/card";
import TableData from "@/Table/TableData";
import useFetch from "@/lib/useFetch";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import AddUser from "@/Table/Actions/User/AddUser";
import DeleteUser from "@/Table/Actions/User/DeleteUser";
import EditUser from "@/Table/Actions/User/EditUser";
import PaginationBtn from "@/Table/Pagination";
import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/dateFormater";

const Users = () => {
  const { fetchAllUsers, users } = useUserStore((state) => state);
  const [test, setTest] = useState<any>(null);
  const { user } = useAuthStore((state) => state);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

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
        const status = props.getValue();
        return (
          <Badge
            className={`bg-${
              status === "active" ? "green" : "red"
            }-500 hover:bg-${status === "active" ? "green" : "red"}-500/90`}
          >
            {status}
          </Badge>
        );
      },
    },
    {
      header: "Job role",
      accessorKey: "role",
    },
    {
      header: "Verified Email",
      accessorKey: "verifiedEmail",
    },
    {
      header: "Updated At",
      accessorKey: "updatedAt",
      cell: (props: any) => <h1>{formatDate(props.getValue())}</h1>,
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: (props: any) => (
        <div className="flex gap-3">
          <EditUser props={props} />
          <DeleteUser props={props} />
        </div>
      ),
    },
  ];

  const unverifiedEmails = users.data?.rows?.filter(
    (user) => user.verifiedEmail === false
  ).length;

  const activeUsers = users.data?.rows?.filter(
    (user) => user.status === "active"
  ).length;

  return (
    <div>
      <div>
        <h1>Dashboard</h1>
        <div className="my-5 flex gap-5">
          <CardData label="Active Users" count={activeUsers} />
          <CardData label="Unverified email" count={unverifiedEmails} />
          <CardData label="Total Users" count={users.data?.count} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <Input
            placeholder="Search"
            className="w-fit"
            value={test}
            onChange={(e) => setTest(e.target.value)}
          />

          <AddUser />
        </div>
        <Card>
          <TableData columns={columns} data={users.data?.rows || users} />
        </Card>
      </div>
    </div>
  );
};

export default Users;
