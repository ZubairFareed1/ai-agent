import React from "react";
// import { Button } from "primereact/button";
import { BiCloudUpload, BiSolidMessageRoundedX } from "react-icons/bi";

import { Tooltip as ReactTooltip } from "react-tooltip";
// import { useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
// import { useDialog } from "../../context/DialogContext";
// import { useAuth } from "../context/AuthContext";

export default function AdminSidebar() {
  // const navigate = useNavigate();
  // const { logout } = useAuth()
  const links = [
    {
      id: 1,
      to: "/admin/upload",
      icon: <BiCloudUpload className="text-white text-3xl" />,
      label: "Upload",
    },
    {
      id: 2,
      to: "/admin/prevent-words",
      icon: <BiSolidMessageRoundedX className="text-white text-3xl" />,
      label: "Prevent words",
    }
  ];
  const { theme } = useTheme();
  return (
    <div
      className={`w-6rem h-screen ${
        theme === "light" ? "bg-blue-500" : "surface-700"
      } flex flex-column justify-content-between align-items-center py-4`}
    >
      <div>
        <Link className="text-5xl font-bold text-white no-underline" to="/admin/upload">
          S
        </Link>
      </div>
      <div>
        <ul className="list-none p-0 ">
          {links.map((link) => (
            <React.Fragment key={link.id}>
              <li
                className={`w-4rem h-4rem border-circle my-4 hover:bg-white-alpha-30 border-1
                        ${
                          theme === "light" ? "border-blue-600" : "border-600"
                        } cursor-pointer flex justify-content-center align-items-center border-solid border-1`}
                data-tooltip-id={link.label}
                data-tooltip-offset={20}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `no-underline h-full w-full flex justify-content-center align-items-center border-circle ${
                      isActive ? "bg-white-alpha-30" : ""
                    }`
                  }
                >
                  {link.icon}
                </NavLink>
              </li>
              <ReactTooltip
                id={link.label}
                place="right"
                content={link.label}
                className="z-5"
                style={{
                  backgroundColor: theme === "light" ? "#007bff" : "#6c757d",
                  padding: "15px",
                }}
              />
            </React.Fragment>
          ))}
         
        </ul>
      </div>
      <div>
        {/* <Avatar image={} size="large" shape="circle" /> */}
      </div>

    </div>
  );
}
