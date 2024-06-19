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
import useUserStore from "@/store/useUserStore";

type EditUserProps = {
  props: any;
};

// Define Zod schema for form validation
const UserSchema = z.object({
  _id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  role: z.string(),
  username: z.string(),
  status: z.string(),
});

type UserFormData = z.infer<typeof UserSchema>;

const EditUser: React.FC<EditUserProps> = ({ props }) => {
  const { _id, status, email, role, username, firstName, lastName } =
    props.row.original;
  const { updateUser, fetchAllUsers } = useUserStore((state) => state);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<UserFormData>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      _id,
      firstName,
      lastName,
      email,
      role,
      username,
      status,
    },
  });

  const [initialValues, setInitialValues] = useState({
    _id,
    firstName,
    lastName,
    email,
    role,
    username,
    status,
  });

  useEffect(() => {
    setInitialValues({
      _id,
      firstName,
      lastName,
      email,
      role,
      username,
      status,
    });
  }, [_id, firstName, lastName, email, role, username, status]);

  const onSubmit = async (data: UserFormData) => {
    const hasChanged = JSON.stringify(data) !== JSON.stringify(initialValues);
    if (!hasChanged) {
      return;
    }

    try {
      const response = await updateUser(data);
      console.log("user", response);
      if (typeof response === "undefined") {
        toast({
          color: "red",
          title: "Update Failed",
          description: "An error occurred while updating the User.",
        });
      }
      fetchAllUsers();
      toast({
        color: "white",
        title: "Successful Update User",
      });
    } catch (error) {
      toast({
        color: "red",
        title: "Update Failed",
        description: "An error occurred while updating the User.",
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
          <AlertDialogTitle>Update User</AlertDialogTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 mt-4">
              <div className="flex gap-2 items-center">
                <div>
                  <label htmlFor="name">First name</label>
                  <Input
                    type="text"
                    {...register("firstName")}
                    className="mt-1 w-full"
                  />
                  {errors.firstName && <p>{errors.firstName.message}</p>}
                </div>
                <div>
                  <label htmlFor="name">Last name</label>
                  <Input
                    type="text"
                    {...register("lastName")}
                    className="mt-1 w-full"
                  />
                  {errors.lastName && <p>{errors.lastName.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  {...register("username")}
                  className="mt-1 w-full"
                />
              </div>
              <div>
                <label htmlFor="status">Status</label>
                <Input
                  type="text"
                  {...register("status")}
                  className="mt-1 w-full"
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  {...register("email")}
                  className="mt-1 w-full"
                />
              </div>
              <div>
                <label htmlFor="role">Role</label>
                <Input
                  type="text"
                  {...register("role")}
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

export default EditUser;
