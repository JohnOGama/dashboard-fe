import {
  BotIcon,
  ChevronDown,
  Circle,
  Contact,
  Globe,
  Home,
  NotebookPen,
  Paperclip,
  RocketIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const menu = [
  {
    label: "Configure",
    icon: <Circle className="text-orange-500" size={18} />,
    path: "/configure",
  },
  {
    label: "Add API",
    icon: <NotebookPen className="text-purple-500" size={18} />,
    path: "/add-api",
  },
  {
    label: "Chatbot",
    icon: <BotIcon className="text-blue-500" size={18} />,
    path: "/chatbot",
  },
  {
    label: "Contacts",
    icon: <Contact className="text-indigo-500" size={18} />,
    path: "/contacts",
  },
  {
    label: "APIs",
    icon: <RocketIcon className="text-pink-500" size={18} />,
    path: "/api",
  },
  {
    label: "Documents",
    icon: <Paperclip className="text-green-500" size={18} />,
    path: "/documents",
  },
];

const Actions = () => {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState<boolean>(true);
  return (
    <div className={`flex gap-5 flex-col mt-5  ${showMenu ? "mb-10" : "mb-5"}`}>
      <div
        className="flex gap-3 items-center cursor-pointer"
        onClick={() => setShowMenu(!showMenu)}
      >
        <ChevronDown className="text-gray-400" size={15} />
        <h1 className="text-sm text-gray-700">ACTIONS</h1>
      </div>
      {showMenu && (
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
      )}
    </div>
  );
};

export default Actions;
