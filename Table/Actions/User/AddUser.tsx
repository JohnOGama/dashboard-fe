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
import { Button, buttonVariants } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useUserStore from "@/store/useUserStore";
import { useToast } from "@/components/ui/use-toast";

const AddressSchema = z.object({
  line1: z.string(),
  line2: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  zip: z.string(),
  currency: z.string(),
});

const UserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  email: z.string().email(),
  username: z.string(),
  dateOfBirth: z.string(),
  address: AddressSchema,
  registrationType: z.enum(["self"]),
  role: z.enum(["user"]),
});

type UserFormData = z.infer<typeof UserSchema>;

const AddUser: React.FC = () => {
  const { addUser, fetchAllUsers } = useUserStore((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(UserSchema),
  });

  const { toast } = useToast();

  const onSubmit = async (data: any) => {
    try {
      const res = await addUser(data);
      toast({
        color: "white",
        title: "Successfully added user",
      });

      // fetchAllUsers();
      reset();
    } catch (error) {
      toast({
        color: "red",
        title: "Update Failed",
        description: "Something went wrong adding user",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className={buttonVariants({ variant: "default" })}>
        Add User
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add User</AlertDialogTitle>
          <AlertDialogDescription>
            {`Fill out the form below to add a new User.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form>
          <div className="space-y-4 mt-4">
            <div className="flex gap-2 items-center">
              <div>
                <label htmlFor="firstName">First name</label>
                <Input
                  type="text"
                  id="firstName"
                  {...register("firstName")}
                  className="mt-1 w-full"
                />
                {errors.firstName && <p>{errors.firstName.message}</p>}
              </div>
              <div>
                <label htmlFor="lastName">Last name</label>
                <Input
                  type="text"
                  id="lastName"
                  {...register("lastName")}
                  className="mt-1 w-full"
                />
                {errors.lastName && <p>{errors.lastName.message}</p>}
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div>
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  id="email"
                  {...register("email")}
                  className="mt-1 w-full"
                />
                {errors.email && <p>{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="phone">Phone</label>
                <Input
                  type="text"
                  id="phone"
                  {...register("phone")}
                  className="mt-1 w-full"
                />
                {errors.phone && <p>{errors.phone.message}</p>}
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <div>
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  id="username"
                  {...register("username")}
                  className="mt-1 w-full"
                />
                {errors.username && <p>{errors.username.message}</p>}
              </div>
              <div>
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <Input
                  type="text"
                  id="dateOfBirth"
                  {...register("dateOfBirth")}
                  className="mt-1 w-full"
                />
                {errors.dateOfBirth && <p>{errors.dateOfBirth.message}</p>}
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <div>
                <label htmlFor="line1">Address Line 1</label>
                <Input
                  type="text"
                  id="line1"
                  {...register("address.line1")}
                  className="mt-1 w-full"
                />
                {errors.address?.line1 && <p>{errors.address.line1.message}</p>}
              </div>
              <div>
                <label htmlFor="line2">Address Line 2</label>
                <Input
                  type="text"
                  id="line2"
                  {...register("address.line2")}
                  className="mt-1 w-full"
                />
                {errors.address?.line2 && <p>{errors.address.line2.message}</p>}
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <div>
                <label htmlFor="city">City</label>
                <Input
                  type="text"
                  id="city"
                  {...register("address.city")}
                  className="mt-1 w-full"
                />
                {errors.address?.city && <p>{errors.address.city.message}</p>}
              </div>
              <div>
                <label htmlFor="state">State</label>
                <Input
                  type="text"
                  id="state"
                  {...register("address.state")}
                  className="mt-1 w-full"
                />
                {errors.address?.state && <p>{errors.address.state.message}</p>}
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <div>
                <label htmlFor="country">Country</label>
                <Input
                  type="text"
                  id="country"
                  {...register("address.country")}
                  className="mt-1 w-full"
                />
                {errors.address?.country && (
                  <p>{errors.address.country.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="zip">ZIP Code</label>
                <Input
                  type="text"
                  id="zip"
                  {...register("address.zip")}
                  className="mt-1 w-full"
                />
                {errors.address?.zip && <p>{errors.address.zip.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="currency">Currency</label>
              <Input
                type="text"
                id="currency"
                {...register("address.currency")}
                className="mt-1 w-full"
              />
              {errors.address?.currency && (
                <p>{errors.address.currency.message}</p>
              )}
            </div>
          </div>

          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel onClick={() => reset()}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction type="submit" onClick={onSubmit}>
              Create User
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddUser;
