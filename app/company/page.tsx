"use client";

import CardData from "@/components/Dashboard/CardData";
import { Card } from "@/components/ui/card";
import TableData from "@/Table/TableData";

import Link from "next/link";

import { Input } from "@/components/ui/input";

import DeleteUser from "@/Table/Actions/User/DeleteUser";
import EditUser from "@/Table/Actions/User/EditUser";

import PaginationBtn from "@/Table/Pagination";
import { formatDate } from "@/utils/dateFormater";

import { useEffect, useState } from "react";
import AddData from "@/components/Common/AddDataInTable";
import useCompanyStore from "@/store/useCompanyStore";
import { Badge } from "@/components/ui/badge";
import EditCompany from "@/Table/Actions/Company/EditCompany";
import AddCompany from "@/Table/Actions/Company/AddCompany";

const Company = ({ hasHeader = true }) => {
  // const { loading, data, refetchData } = useFetch("user", "/get-all-user");
  const [formData, setFormData] = useState({
    companyName: "",
    sales: "",
    revenue: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { companies, fetchAllCompanies, onError, errorMessage, loading } =
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
      header: "Company size",
      accessorKey: "companySize",
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
          <EditCompany props={props} />
          <DeleteUser props={props} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchAllCompanies();
  }, [fetchAllCompanies]);

  const activeCompanies = companies.data?.rows?.filter(
    (company) => company.status === "active"
  ).length;

  return (
    <div className="">
      <div>
        <h1>Dashboard</h1>
        <div className="my-5 flex gap-5">
          <CardData label="Active Company" count={activeCompanies} />
          <CardData label="Pending Company" />
          <CardData label="Total Company" count={companies.data?.count} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <Input placeholder="Search" className="w-fit" />

          <AddCompany />
        </div>
        <Card>
          <TableData
            columns={columns}
            data={companies?.data?.rows || companies}
            onError={onError}
            errorMessage={errorMessage}
          />
        </Card>
      </div>
    </div>
  );
};

export default Company;
