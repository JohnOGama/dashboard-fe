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
import { Input } from "@/components/ui/input";
import axios, { AxiosError } from "axios";
import { baseUrl } from "@/const/const";
import { Button, buttonVariants } from "@/components/ui/button";

type EditWebsiteProps = {
  refreshData?: () => void;
  handleChange?: any;
  formData?: any;
  error?: any;
  handleAddUser?: any;
  isLoading?: any;
  label?: string;
};

const AddData: React.FC<EditWebsiteProps> = ({
  handleChange,
  formData,
  error,
  handleAddUser,
  isLoading,
  label,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className={buttonVariants({ variant: "default" })}>
        Add {label}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add {label}</AlertDialogTitle>
          <AlertDialogDescription>
            {`Fill out the form below to add a new ${label}.`}
          </AlertDialogDescription>
          <div className="space-y-4 mt-4">
            <div>
              <span>Name</span>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full"
              />
            </div>
            <div>
              <span>Email</span>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full"
              />
            </div>
            <div>
              <span>Company Name</span>
              <Input
                type="text"
                name="status"
                value={formData.companyName}
                onChange={handleChange}
                className="mt-1 w-full"
              />
            </div>

            {error && <div className="text-red-500 mt-2">{error}</div>}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAddUser} disabled={isLoading}>
            {isLoading ? "Adding..." : "Add User"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddData;
