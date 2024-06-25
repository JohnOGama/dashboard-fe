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
import Image from "next/image";
import PLACEHOLDER_BG from "@/public/images/placeholder-bg.jpg";
import PROFILE from "@/public/images/profile-placeholder.jpg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatusDropdown from "@/components/Common/StatusDropdown";
import { StatusOptions } from "@/utils/staticData";

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
  const { _id, status, email, role, username, firstName, lastName, fullName } =
    user;
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
      onClose();
      handleClose();
      return;
    }

    try {
      const response = await updateUser(data);

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
    >
      <h1 className="my-5 font-semibold">Edit User Profile</h1>
      <div className="w-full relative" style={{ height: "200px" }}>
        <Image
          alt="Bg"
          src={PLACEHOLDER_BG}
          className="rounded-lg w-full  "
          style={{ height: "200px", objectFit: "cover" }}
          quality={100}
        />
        <Image
          alt="profile"
          src={PROFILE}
          style={{
            height: 70,
            width: 70,
            position: "absolute",
            bottom: "-30px",
            left: "30px",
            borderRadius: "20px",
            border: "3px solid white",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "110px",
            bottom: 10,
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <h1 style={{ color: " white", fontWeight: "bold" }}>Your name</h1>{" "}
          <div
            style={{
              width: 10,
              height: 10,
              background: status === "active" ? "#6EC531" : "red",
              borderRadius: 100,
            }}
          />
        </div>
      </div>
      <div
        className="bg-gray-100 mt-14 rounded-lg relative"
        style={{ padding: "16px 20px " }}
      >
        <form
          className="flex flex-col justify-between "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-4 mt-4">
            <h1 className="font-semibold">Personal Information:</h1>
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
                <StatusDropdown
                  ref={register("status").ref}
                  setValue={setValue}
                  status={status}
                  options={StatusOptions}
                />
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
              <Input
                type="text"
                {...register("role")}
                className="mt-1 w-full"
              />
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
    </div>
  );
};

export default EditUserForm;
