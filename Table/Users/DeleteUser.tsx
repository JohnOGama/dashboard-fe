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
import { Edit, Edit2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import axios, { AxiosError } from "axios";
import { baseUrl } from "@/const/const";

type DeleteUserProps = {
  props: any;
  refreshData: () => void;
};

const DeleteUser: React.FC<DeleteUserProps> = ({ props, refreshData }) => {
  async function handleDeleteSite(id: any) {
    try {
      const res = await axios.delete(`${baseUrl}/api/user/delete-user/${id}`);
      refreshData();
    } catch (error) {
      console.log("ERROR IN DELETING USER", error);
    }
  }

  console.log("props", props?.row.original?._id);

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Badge className="bg-red-500 hover:bg-red-500/90">Delete</Badge>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Website</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div>
            <h1>Are you sure?</h1>
          </div>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeleteSite(props.row.original._id)}
          >
            Delete User
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUser;
