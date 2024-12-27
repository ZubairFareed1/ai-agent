import React from "react";
import { Button } from "primereact/button";
import { BiSolidMessageDots } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Tooltip as ReactTooltip } from "react-tooltip";
// import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Avatar } from "primereact/avatar";
import avator from "../assets/avator4.webp";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import { useDialog } from "../context/DialogContext";
// import { useAuth } from "../context/AuthContext";


export default function Sidebar() {
  // const navigate = useNavigate();
  // const { logout } = useAuth()
  const {handleLogoutClick} = useDialog();
  const { showDialog, handleConfirmLogout, handleCancelLogout } = useDialog();
  const links = [
    {
    
      id: 1,
      to: "/",
      icon: <BiSolidMessageDots className="text-white text-3xl" />,
      label: "Chat",
    },
    {
      id: 2,
      to: "/login_history",
      icon: <FaHistory className="text-white text-3xl" />,
      label: "Login History",
    },
    {
      id: 3,
      to: "/profile",
      icon: <FaUser className="text-white text-3xl" />,
      label: "Profile",
    },
  ];
  const { theme } = useTheme();
  return (
    <div
      className={`w-6rem h-screen ${
        theme === "light" ? "bg-blue-500" : "surface-700"
      } flex flex-column justify-content-between align-items-center py-4`}
    >
      <div>
        <Link className="text-5xl font-bold text-white no-underline" href="/">
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
          <li
            className={`w-4rem h-4rem border-circle my-4 hover:bg-white-alpha-30 border-1
                        ${
                          theme === "light" ? "border-blue-600" : "border-600"
                        } cursor-pointer flex justify-content-center align-items-center border-solid border-1`}
            data-tooltip-id="logout"
            data-tooltip-offset={20}
          >
            <button
              className={`no-underline h-full w-full flex justify-content-center align-items-center border-circle bg-transparent border-none cursor-pointer`}
              onClick={handleLogoutClick}
            >
              {<BiLogOut className="text-white text-3xl" />}
            </button>
          </li>
          <ReactTooltip
            id="logout"
            place="right"
            content="Logout"
            className="z-5"
            style={{
              backgroundColor: theme === "light" ? "#007bff" : "#6c757d",
              padding: "15px",
            }}
          />
        </ul>
      </div>
      <div>
        <Avatar image={avator} size="large" shape="circle" />
      </div>
       <Dialog
      header="Confirm Logout"
      className=""
      visible={showDialog}
      style={{ width: '30vw' }} breakpoints={{ '960px': '75vw', '641px': '95vw' }}
      onHide={handleCancelLogout}  // Directly call handleCancelLogout here
    >
      <p>Are you sure you want to log out?</p>
      <div className="flex justify-content-between">
        <Button label="Yes" icon="pi pi-check" onClick={handleConfirmLogout} />
        <Button label="No" icon="pi pi-times" onClick={handleCancelLogout} />
      </div>
    </Dialog>
    </div>
  );
}
