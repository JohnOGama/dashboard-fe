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
import { Edit, Edit2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import axios, { AxiosError } from "axios";
import { baseUrl } from "@/const/const";

type EditUserProps = {
  props: any;
  refreshData: () => void;
};

const EditUser: React.FC<EditUserProps> = ({ props, refreshData }) => {
  const { name, status, email, role } = props.row.original;
  const [formData, setFormData] = useState({
    name,
    status,
    email,
    role,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setFormData({
      name,
      status,
      email,
      role,
    });
  };

  async function handleUpdateSite(id: string) {
    try {
      const response = await axios.put(
        `${baseUrl}/api/website/update-website/${id}`,
        formData
      );
      refreshData();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Badge>Edit</Badge>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update website</AlertDialogTitle>
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
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => handleClose()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction>Update Site</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditUser;
