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
import { formatDate } from "@/utils/dateFormater";

import axios from "axios";
import { baseUrl } from "@/const/const";
import { useEffect, useState } from "react";
import AddData from "@/components/Common/AddDataInTable";
import useCompanyStore from "@/store/useCompanyStore";
import { Badge } from "@/components/ui/badge";

const Company = ({ hasHeader = true }) => {
  // const { loading, data, refetchData } = useFetch("user", "/get-all-user");
  const [formData, setFormData] = useState({
    companyName: "",
    sales: "",
    revenue: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { company, fetchAllCompanies, onError, errorMessage, loading } =
    useCompanyStore((state) => state);

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
      header: "Industry",
      accessorKey: "industry",
      cell: ({ getValue }: any) => (
        <Link href={`${getValue()}`} className="text-gray-500 font-medium">
          {getValue()}
        </Link>
      ),
    },

    {
      header: "Subscription",
      accessorKey: "subscription",
      cell: ({ getValue }: any) => {
        return <>{getValue().type}</>;
      },
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
      header: "Updated At",
      accessorKey: "updatedAt",
      cell: (props: any) => <h1>{formatDate(props.getValue())}</h1>,
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
    fetchAllCompanies();
  }, [fetchAllCompanies]);

  console.log("loading", loading);

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

          <AddData
            error={error}
            formData={formData}
            isLoading={isLoading}
            label="Company"
          />
        </div>
        <Card>
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <TableData
              columns={columns}
              data={company}
              onError={onError}
              errorMessage={errorMessage}
            />
          )}

          <PaginationBtn />
        </Card>
      </div>
    </div>
  );
};

export default Company;
