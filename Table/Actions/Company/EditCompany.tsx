import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import useCompanyStore from "@/store/useCompanyStore";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type EditUserProps = {
  props: any;
};

// Define Zod schema for form validation
const CompanySchema = z.object({
  _id: z.string(),
  name: z.string(),
  industry: z.string(),
  subscription: z.object({
    type: z.string(),
  }),
});

type CompanyFormData = z.infer<typeof CompanySchema>;

const EditCompany: React.FC<EditUserProps> = ({ props }) => {
  const { _id, name, industry, subscription } = props.row.original;
  const { updateCompanies, fetchAllCompanies } = useCompanyStore(
    (state) => state
  );
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<CompanyFormData>({
    resolver: zodResolver(CompanySchema),
    defaultValues: {
      _id,
      name,
      industry,
      subscription,
    },
  });

  const [initialValues, setInitialValues] = useState({
    _id,
    name,
    industry,
    subscription,
  });

  useEffect(() => {
    // Set initial values on mount
    setInitialValues({
      _id,
      name,
      industry,
      subscription,
    });
  }, [_id, name, industry, subscription]);

  const onSubmit = async (data: CompanyFormData) => {
    const hasChanged = JSON.stringify(data) !== JSON.stringify(initialValues);
    if (!hasChanged) {
      return;
    }

    try {
      const response = await updateCompanies(data);
      fetchAllCompanies();
      toast({
        color: "white",
        title: "Successful Update Company",
      });
    } catch (error) {
      toast({
        color: "red",
        title: "Update Failed",
        description: "An error occurred while updating the company.",
      });
    }
  };

  const handleClose = () => {
    reset(initialValues);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Badge>Edit</Badge>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update Company</AlertDialogTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 mt-4">
              <div>
                <label htmlFor="name">Name</label>
                <Input
                  type="text"
                  {...register("name")}
                  className="mt-1 w-full"
                />
                {errors.name && <p>{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="industry">Industry</label>
                <Input
                  type="text"
                  {...register("industry")}
                  className="mt-1 w-full"
                />
              </div>
              <div>
                <label htmlFor="subscription">Subscription</label>
                <Input
                  type="text"
                  {...register("subscription.type")}
                  className="mt-1 w-full"
                />
              </div>
            </div>
            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel onClick={handleClose}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction type="submit">Update Site</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditCompany;
