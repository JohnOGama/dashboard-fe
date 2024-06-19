import React, { useEffect, useState } from "react";
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
import useUserStore from "@/store/useUserStore";
import { useToast } from "@/components/ui/use-toast";

type DeleteUserProps = {
  props: any;
};

const DeleteUser: React.FC<DeleteUserProps> = ({ props }) => {
  const { _id } = props.row.original;
  const { deleteUser, fetchAllUsers } = useUserStore((state) => state);

  const { toast } = useToast();

  async function handleDeleteSite() {
    toast({
      color: "white",
      title: "Successful Delete User",
    });
    await deleteUser(_id);
    fetchAllUsers();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Badge className="bg-red-500 hover:bg-red-500/90">Delete</Badge>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete User</AlertDialogTitle>
          <div>
            <h1>Are you sure?</h1>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteSite}>
            Delete User
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUser;
