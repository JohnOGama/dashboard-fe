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
import { Input } from "@/components/ui/input";
import { baseUrl } from "@/const/const";
import { Button, buttonVariants } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { CompanySchema } from "@/types/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useCompanyStore, { CompanyResponse } from "@/store/useCompanyStore";
import { useToast } from "@/components/ui/use-toast";

type CompanyFormData = z.infer<typeof CompanySchema>;

const AddCompany = ({}) => {
  const { addCompany, fetchAllCompanies, successMessage, errorMessage } =
    useCompanyStore((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CompanyFormData>({
    resolver: zodResolver(CompanySchema),
  });

  const { toast } = useToast();

  const onSubmit = async (data: CompanyFormData) => {
    try {
      await addCompany(data);
      toast({
        color: "white",
        title: successMessage || "Successful adding company",
      });
      fetchAllCompanies();
      reset();
    } catch (error) {
      toast({
        color: "red",
        title: "Update Failed",
        description: errorMessage || "Something wrong adding company",
      });
    }
  };

  useEffect(() => {
    fetchAllCompanies();
  }, [fetchAllCompanies]);

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
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 mt-4">
            <div>
              <label htmlFor="name">Name</label>
              <Input
                type="text"
                id="name"
                {...register("name")}
                className="mt-1 w-full"
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="industry">Industry</label>
              <Input
                type="text"
                id="industry"
                {...register("industry")}
                className="mt-1 w-full"
              />
              {errors.industry && <p>{errors.industry.message}</p>}
            </div>
          </div>

          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel onClick={() => reset()}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction type="submit">Create company</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddCompany;
