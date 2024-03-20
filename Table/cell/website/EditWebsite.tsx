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

type EditWebsiteProps = {
  props: any;
  refreshData: () => void;
};

const EditWebsite: React.FC<EditWebsiteProps> = ({ props, refreshData }) => {
  const { url_name, deploy_status, users, _id, role } = props.row.original;
  const [formData, setFormData] = useState({
    url_name,
    deploy_status,
    users,
    role,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setFormData({
      url_name,
      deploy_status,
      users,
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
          <div>
            <div>
              <span>URL name</span>
              <Input
                type="text"
                name="url_name"
                value={formData.url_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <span>Deploy Status</span>
              <Input
                type="text"
                name="deploy_status"
                disabled
                value={formData.deploy_status}
                onChange={handleChange}
              />
            </div>
            <div>
              <span>Users</span>
              <Input
                type="text"
                name="users"
                disabled
                value={formData.users}
                onChange={handleChange}
              />
            </div>
            <div>
              <span>Role</span>
              <Input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
              />
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => handleClose()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => handleUpdateSite(_id)}>
            Update Site
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditWebsite;
