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
import useUserStore from "@/store/useUserStore";
import { useToast } from "@/components/ui/use-toast";

type EditUserProps = {
  props: any;
};

const EditUser: React.FC<EditUserProps> = ({ props }) => {
  const { name, status, email, role, id } = props.row.original;

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

  const { toast } = useToast();

  async function handleUpdateSite() {
    toast({
      color: "white",
      title: "Successful Update User",
    });
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
          <AlertDialogAction onClick={handleUpdateSite}>
            Update Site
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditUser;
