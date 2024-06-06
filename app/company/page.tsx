"use client";

import CardData from "@/components/Dashboard/CardData";
import { Card } from "@/components/ui/card";
import TableData from "@/Table/TableData";

import useFetch from "@/lib/useFetch";

import Link from "next/link";

import { Input } from "@/components/ui/input";

import DeleteUser from "@/Table/Users/DeleteUser";
import EditUser from "@/Table/Users/EditUser";

import data1 from "@/MOCK_DATA/Company.json";
import PaginationBtn from "@/Table/Pagination";

import axios from "axios";
import { baseUrl } from "@/const/const";
import { useState } from "react";
import AddData from "@/components/Common/AddDataInTable";

const Clients = ({ hasHeader = true }) => {
  const { loading, data, refetchData } = useFetch("user", "/get-all-user");
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
      header: "Company name",
      accessorKey: "company_name",
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
            <CardData label="Active Company" />
            <CardData label="Pending Company" />
            <CardData label="Total Company" />
          </div>
        </div>
      ) : null}

      {loading ? (
        <h1>Loading...</h1>
      ) : (
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
              label="Company"
            />
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

export default Clients;
