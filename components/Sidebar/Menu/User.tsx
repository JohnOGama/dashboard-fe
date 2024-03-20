import { Moon, Settings, Trash, UserIcon } from "lucide-react";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useAuthStore from "@/store/useAuthStore";
import { useCookies } from "react-cookie";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const User = () => {
  const { logout } = useAuthStore((state: any) => state);
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);
  const { toast } = useToast();
  const router = useRouter();
  return (
    <Popover>
      <PopoverTrigger className="absolute bottom-14 flex items-center gap-2">
        <UserIcon size={18} className="text-gray-500" />
        <h1 className="text-sm font-medium text-gray-500">John Ogama</h1>
      </PopoverTrigger>
      <PopoverContent
        className="ml-5 w-auto mb-5 flex flex-col gap-5 "
        sideOffset={2}
      >
        <div className="flex gap-3 items-center hover:underline duraiton-300  cursor-pointer">
          <UserIcon size={18} className="text-pink-500" />
          <h1 className="text-gray-500 text-sm">Profile</h1>
        </div>
        <div className="flex gap-3 items-center hover:underline duraiton-300 cursor-pointer">
          <Moon size={18} className="text-green-500" />
          <h1 className="text-gray-500 text-sm">Dark Mode</h1>
        </div>
        <div className="flex gap-3 items-center hover:underline duraiton-300 cursor-pointer">
          <Settings size={18} className="text-blue-500" />
          <h1 className="text-gray-500 text-sm">Settings</h1>
        </div>

        <div
          onClick={() => {
            logout();
            removeCookie("auth");
            toast({
              color: "white",
              title: "Successful logout",
              description: "Redirect to login",
            });
            router.push("/login");
          }}
          className="flex gap-3 items-center hover:underline duraiton-300 border-t-[1px] pt-2 cursor-pointer"
        >
          <Trash size={18} className="text-red-500 " />
          <h1 className="text-red-500 text-sm">Logout</h1>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default User;
