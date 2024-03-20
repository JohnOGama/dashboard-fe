"use client";
import { Badge } from "@/components/ui/badge";

import CardData from "@/components/Dashboard/CardData";
import { Card } from "@/components/ui/card";
import TableData from "@/Table/TableData";
import { dateFormatter } from "@/lib/date-formater";
import useFetch from "@/lib/useFetch";

import Link from "next/link";
import DeleteWebsite from "@/Table/cell/website/DeleteWebsite";
import EditWebsite from "@/Table/cell/website/EditWebsite";

const Home = ({ hasHeader = true }) => {
  const { loading, data, refetchData } = useFetch(
    "website",
    "/get-all-website"
  );

  const columns = [
    {
      header: "URL name",
      accessorKey: "url_name",
      cell: ({ getValue }: any) => (
        <Link href={`${getValue()}`} className="text-gray-500 font-medium">
          {getValue()}
        </Link>
      ),
    },
    {
      header: "Deploy Status",
      accessorKey: "deploy_status",
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
      header: "Users",
      accessorKey: "users",
    },
    {
      header: "Admin",
      accessorKey: "admin",
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: (props: any) => <h1>{dateFormatter(props.getValue())}</h1>,
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: (props: any) => (
        <div className="flex gap-3">
          <EditWebsite props={props} refreshData={refetchData} />
          <DeleteWebsite />
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
            <CardData label="Websites" />
            <CardData label="APIs" />
            <CardData label="Totals" />
          </div>
        </div>
      ) : null}

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <Card>
          <TableData columns={columns} data={data} />
        </Card>
      )}
    </div>
  );
};

export default Home;
