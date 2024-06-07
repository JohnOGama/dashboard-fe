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
import { cn } from "@/lib/utils";
import useUserStore from "@/store/useUserStore";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/components/ui/use-toast";

type EditWebsiteProps = {
  refreshData?: () => void;
};

const AddUser: React.FC<EditWebsiteProps> = ({ refreshData }) => {
  const userId = uuidv4();
  const [formData, setFormData] = useState({
    id: userId,
    name: "",
    email: "",
    status: "",
    role: "",
    createdAt: "8:00pm",
  });
  const { addUser } = useUserStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddUser = async () => {
    if (
      !formData.name ||
      !formData.status ||
      !formData.email ||
      !formData.role
    ) {
      setError("All fields are required.");
      return;
    }
    toast({
      color: "white",
      title: "Successful Add User",
    });
    setIsLoading(true);
    setError(null);
    addUser(formData);
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
            Fill out the form below to add a new user.
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
              <span>Status</span>
              <Input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 w-full"
              />
            </div>

            <div>
              <span>Job Role</span>
              <Input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 w-full"
              />
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAddUser}>
            Add User
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddUser;
