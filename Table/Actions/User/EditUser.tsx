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
  name: z.string(),
  email: z.string(),
  role: z.string(),
  username: z.string(),
});

type UserFormData = z.infer<typeof UserSchema>;

const EditUser: React.FC<EditUserProps> = ({ props }) => {
  const { _id, name, email, role, username } = props.row.original;
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
      name,
      email,
      role,
      username,
    },
  });

  const [initialValues, setInitialValues] = useState({
    _id,
    name,
    email,
    role,
    username,
  });

  useEffect(() => {
    setInitialValues({
      _id,
      name,
      email,
      role,
      username,
    });
  }, [_id, name, email, role, username]);

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
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  {...register("username")}
                  className="mt-1 w-full"
                />
                {errors.name && <p>{errors.name.message}</p>}
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
