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
import { useForm } from "react-hook-form";
import { CompanySchema } from "@/types/userSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useCompanyStore from "@/store/useCompanyStore";
import { useToast } from "@/components/ui/use-toast";

type EditWebsiteProps = {
  refreshData?: () => void;
  handleChange?: any;
  formData?: any;
  error?: any;
  handleAddUser?: any;
  isLoading?: any;
};

type CompanyFormData = z.infer<typeof CompanySchema>;

const AddCompany: React.FC<EditWebsiteProps> = ({
  handleChange,
  formData,
  error,
  handleAddUser,
  isLoading,
}) => {
  const { addCompany } = useCompanyStore((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CompanyFormData>({
    resolver: zodResolver(CompanySchema),
  });

  const { toast } = useToast();

  const onSubmit = async () => {
    const data = {
      _id: "1",
      companySize: 100,
      createdAt: "2024-01-01T00:00:00.000Z",
      createdBy: "user1",
      industry: "Technology",
      name: "Tech Corp",
      primaryContact: "John Doe",
      sameBillingAndPostal: true,
      secondaryContact: "Jane Smith",
      status: "active",
      subscription: { type: "free" },
      updatedAt: "2024-01-01T00:00:00.000Z",
      users: [
        { userId: "user1", actionRole: "admin" },
        { userId: "user2", actionRole: "editor" },
      ],
    };
    try {
      await addCompany(data);
      toast({
        color: "white",
        title: "Successful Add company",
      });
    } catch (error) {
      toast({
        color: "red",
        title: "Update Failed",
        description: "An error occurred while adding the company.",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className={buttonVariants({ variant: "default" })}>
        Add Company
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add Company</AlertDialogTitle>
          <AlertDialogDescription>
            {`Fill out the form below to add a new Company.`}
          </AlertDialogDescription>
          <form>
            <div className="space-y-4 mt-4">
              <div>
                <label htmlFor="name">Name</label>
                <Input
                  type="text"
                  {...register("name")}
                  className="mt-1 w-full"
                />
              </div>
              <div>
                <label htmlFor="industry">Industry</label>
                <Input
                  type="text"
                  {...register("industry")}
                  className="mt-1 w-full"
                />
              </div>
            </div>

            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onSubmit}>
                Create company
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddCompany;
