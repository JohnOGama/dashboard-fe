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

import data1 from "@/MOCK_DATA/Boards.json";
import PaginationBtn from "@/Table/Pagination";
import { useEffect, useState } from "react";
import { baseUrl } from "@/const/const";
import axios from "axios";
import AddData from "@/components/Common/AddDataInTable";
import useBoardStore from "@/store/useBoardStore";

const Boards = ({ hasHeader = true }) => {
  const { loading, data, refetchData } = useFetch("user", "/get-all-user");
  const { boards, fetchAllBoards } = useBoardStore((state) => state);
  const [formData, setFormData] = useState({
    companyName: "",
    sales: "",
    revenue: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddUser = async () => {
    if (!formData.companyName || !formData.sales || !formData.revenue) {
      setError("All fields are required.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${baseUrl}/api/user/add-user`,
        formData
      );
      if (response.status === 200 && refetchData) {
        refetchData();
      }
      setFormData({
        companyName: "",
        sales: "",
        revenue: "",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data.message || "An error occurred. Please try again."
        );
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      header: "Company Name",
      accessorKey: "companyName",
      cell: ({ getValue }: any) => (
        <Link href={`${getValue()}`} className="text-gray-500 font-medium">
          {getValue()}
        </Link>
      ),
    },
    {
      header: "Sales",
      accessorKey: "sales",
      cell: ({ getValue }: any) => (
        <Link href={`${getValue()}`} className="text-gray-500 font-medium">
          {getValue()}
        </Link>
      ),
    },

    {
      header: "Revenues",
      accessorKey: "revenue",
    },

    {
      header: "Actions",
      accessorKey: "actions",
      cell: (props: any) => (
        <div className="flex gap-3">
          {/* <EditWebsite props={props} refreshData={refetchData} /> */}
          <EditUser props={props} />
          <DeleteUser props={props} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchAllBoards();
  }, [fetchAllBoards]);

  return (
    <div className="">
      {hasHeader ? (
        <div>
          <h1>Dashboard</h1>
          <div className="my-5 flex gap-5">
            <CardData label="Active Boards" />
            <CardData label="Pending Boards" />
            <CardData label="Total Sales" />
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <Input placeholder="Search" className="w-fit" />
          <AddData
            refreshData={refetchData}
            error={error}
            formData={formData}
            handleAddUser={handleAddUser}
            handleChange={handleChange}
            isLoading={isLoading}
            label="Boards"
          />
        </div>
        <Card>
          <TableData columns={columns} data={boards} />
          <PaginationBtn />
        </Card>
      </div>
    </div>
  );
};

export default Boards;
