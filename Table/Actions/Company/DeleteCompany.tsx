import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import useCompanyStore from "@/store/useCompanyStore";

type DeleteCompanyProps = {
  props: any;
};

const DeleteCompany: React.FC<DeleteCompanyProps> = ({ props }) => {
  const { _id } = props.row.original;
  const { deleteCompany, fetchAllCompanies } = useCompanyStore(
    (state) => state
  );

  const { toast } = useToast();

  async function handleDeleteCompany() {
    fetchAllCompanies();
    toast({
      color: "white",
      title: "Successful Delete Company",
    });
    deleteCompany(_id);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Badge className="bg-red-500 hover:bg-red-500/90">Delete</Badge>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Company</AlertDialogTitle>
          <div>
            <h1>Are you sure?</h1>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteCompany}>
            Delete Company
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCompany;
