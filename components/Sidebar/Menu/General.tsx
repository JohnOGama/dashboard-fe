import {
  ChevronDown,
  Contact,
  Globe,
  Home,
  Paperclip,
  RocketIcon,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const menu = [
  {
    label: "Home",
    icon: <Home className="text-orange-500" size={18} />,
    path: "/",
  },
  {
    label: "Users",
    icon: <Users className="text-blue-500" size={18} />,
    path: "/users",
  },
  {
    label: "Company",
    icon: <Globe className="text-purple-500" size={18} />,
    path: "/company",
  },
  {
    label: "Boards",
    icon: <Contact className="text-indigo-500" size={18} />,
    path: "/boards",
  },
  // {
  //   label: "Settings",
  //   icon: <Settings className="text-pink-500" size={18} />,
  //   path: "/settings",
  // },
];

const General = () => {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState<boolean>(true);
  return (
    <div
      className={`flex gap-5 flex-col mt-10  ${showMenu ? "mb-10" : "mb-5"}`}
    >
      <React.Fragment>
        {menu.map((nav, index) => (
          <Link
            href={nav.path}
            key={index}
            className={`flex gap-4 items-center hover:underline duration-300 ${
              pathname === nav.path && "underline"
            }`}
          >
            <div>{nav.icon}</div>
            <h1 className="text-gray-600 text-sm font-normal">{nav.label}</h1>
          </Link>
        ))}
      </React.Fragment>
    </div>
  );
};

export default General;
