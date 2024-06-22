"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import useUserStore from "@/store/useUserStore";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

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

const EditUserForm = ({ user, onClose }: any) => {
  const { _id, status, email, role, username, firstName, lastName } = user;
  const { updateUser, fetchAllUsers } = useUserStore((state) => state);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
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
      onClose();
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
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="fixed right-0 w-[450px] bg-white h-screen top-0 px-2"
    >
      <div className="my-10">
        <h1>Update User</h1>
      </div>

      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4 mt-4">
          <div className="flex gap-2 items-center">
            <div>
              <label htmlFor="firstName">First name</label>
              <Input
                type="text"
                {...register("firstName")}
                className="mt-1 w-full"
              />
            </div>
            <div>
              <label htmlFor="lastName">Last name</label>
              <Input
                type="text"
                {...register("lastName")}
                className="mt-1 w-full"
              />
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
          <div className="flex gap-2">
            <div>
              <label htmlFor="status">Status</label>
              <DropdownMenu>
                <DropdownMenuTrigger className="">
                  <Input
                    type="text"
                    {...register("status")}
                    className="mt-1 w-full"
                    value={watch("status")}
                    readOnly
                  />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-full ">
                  <DropdownMenuLabel>Set Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup className="w-full">
                    <DropdownMenuItem
                      className="w-full"
                      onSelect={() => setValue("status", "active")}
                    >
                      Active
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="w-full"
                      onSelect={() => setValue("status", "inactive")}
                    >
                      Inactive
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="w-full">
              <label htmlFor="email">Email</label>
              <Input
                type="text"
                {...register("email")}
                className="mt-1 w-full"
              />
            </div>
          </div>

          <div>
            <label htmlFor="role">Role</label>
            <Input type="text" {...register("role")} className="mt-1 w-full" />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Update User</Button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;
