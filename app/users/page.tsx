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
import LoadingSpinner from "@/components/Common/Loading";
import EditUserForm from "@/Table/Actions/User/EditUser"; // Import the new EditUserForm component
import CustomModal from "@/components/Common/CustomModal";

const Users = () => {
  const { fetchAllUsers, users, loading } = useUserStore((state) => state);
  const { user } = useAuthStore((state) => state);
  const [editingUser, setEditingUser] = useState(null); // State to track the user being edited

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
      header: "Username",
      accessorKey: "username",
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
          <Badge
            className="cursor-pointer"
            onClick={() => setEditingUser(props.row.original)}
          >
            Edit
          </Badge>

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
      <div className="my-5">
        <h1>Users</h1>
        {/* <div className="my-5 flex gap-5">
          <CardData label="Active Users" count={activeUsers} />
          <CardData label="Unverified email" count={unverifiedEmails} />
          <CardData label="Total Users" count={users.data?.count} />
        </div> */}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[40vh]">
          <LoadingSpinner />
        </div>
      ) : (
        <TableData
          columns={columns}
          data={users.data?.rows || users}
          UserDropdown
        />
      )}
      {editingUser && (
        <CustomModal open={editingUser} onClose={() => setEditingUser(null)}>
          <div className="bg-white ">
            <EditUserForm
              user={editingUser}
              onClose={() => setEditingUser(null)}
            />
          </div>
        </CustomModal>
      )}
    </div>
  );
};

export default Users;
