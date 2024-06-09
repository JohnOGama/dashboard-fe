"use client";

import CardData from "@/components/Dashboard/CardData";
import { Card } from "@/components/ui/card";
import TableData from "@/Table/TableData";

import useFetch from "@/lib/useFetch";

import Link from "next/link";

import { Input } from "@/components/ui/input";

import AddUser from "@/Table/Actions/User/AddUser";
import DeleteUser from "@/Table/Actions/User/DeleteUser";
import EditUser from "@/Table/Actions/User/EditUser";

import data1 from "@/MOCK_DATA/Company.json";
import PaginationBtn from "@/Table/Pagination";

import axios from "axios";
import { baseUrl } from "@/const/const";
import { useEffect, useState } from "react";
import AddData from "@/components/Common/AddDataInTable";
import useCompanyStore from "@/store/useCompanyStore";

const Clients = ({ hasHeader = true }) => {
  const { loading, data, refetchData } = useFetch("user", "/get-all-user");
  const [formData, setFormData] = useState({
    companyName: "",
    sales: "",
    revenue: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { company, fetchAllCompanies, onError, errorMessage } = useCompanyStore(
    (state) => state
  );

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
          <EditUser props={props} />
          <DeleteUser props={props} />
        </div>
      ),
    },
  ];

  console.log("company", company);

  useEffect(() => {
    fetchAllCompanies();
  }, [fetchAllCompanies]);

  return (
    <div className="">
      <div>
        <h1>Dashboard</h1>
        <div className="my-5 flex gap-5">
          <CardData label="Active Company" />
          <CardData label="Pending Company" />
          <CardData label="Total Company" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <Input placeholder="Search" className="w-fit" />
          <h1 className="flex justify-center items-center bg-red-300">
            {onError && `Error: ${errorMessage}`}
          </h1>
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
          <TableData
            columns={columns}
            data={company}
            onError={onError}
            errorMessage={errorMessage}
          />

          <PaginationBtn />
        </Card>
      </div>
    </div>
  );
};

export default Clients;
