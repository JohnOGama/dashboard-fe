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

const DeleteWebsite = () => {
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
          <AlertDialogAction>Update Site</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteWebsite;
