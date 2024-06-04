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
import { Button } from "@/components/ui/button";

type EditWebsiteProps = {
  refreshData?: () => void;
};

const AddUser: React.FC<EditWebsiteProps> = ({ refreshData }) => {
  const [formData, setFormData] = useState({
    name: "",
    status: "",
    email: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${baseUrl}/api/user/add-user`,
        formData
      );
      if (response.status === 200 && refreshData) {
        refreshData();
      }
      setFormData({
        name: "",
        status: "",
        email: "",
        role: "",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data.message || "An error occurred. Please try again."
        );
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button>Add User</Button>
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
          <AlertDialogAction onClick={handleAddUser} disabled={isLoading}>
            {isLoading ? "Adding..." : "Add User"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddUser;
