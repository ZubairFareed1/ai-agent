import React from "react";
import Header from "../components/Header";
import { useTheme } from "../ThemeContext";
import { FaCamera } from "react-icons/fa";
import profile_picture from "../assets/avator4.webp";
import Scrollbars from "rc-scrollbars";

export default function Profile() {
  const { theme } = useTheme();
  return (
    <div className="h-screen lg:p-5">
      <div
        className={`h-full ${
          theme === "light" ? "bg-white  border-400" : " border-700 surface-800"
        } lg:border-round-md border-1`}
      >
        <Scrollbars>
          <div>
            <Header />
          </div>
          <div className="m-4 border-1 p-2">
            <div className="flex gap-4">
              <div className="relative inline-block">
                <img
                  src={profile_picture}
                  alt="Profile Picture"
                  className="w-10rem h-10rem border-circle"
                  style={{ objectFit: "cover" }}
                />
                <div
                  className="absolute"
                  style={{ right: "10px", bottom: "10px" }}
                >
                  <button className="w-3rem h-3rem border-circle border-1 border-300 surface-700 cursor-pointer">
                    <FaCamera className="text-white text-xl" />
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <h1 className="text-4xl font-semibold">Sophia Smith</h1>
                <p className="text-gray-700 text-base">
                  sophia.smith@gmail.com
                </p>
              </div>
            </div>
            <div>
              <h2>Personal Information</h2>
              <div className="flex flex-column gap-3 mt-4">
                <div className="flex flex-column md:flex-row gap-3 md:gap-8">
                  <div className=" w-12 md:w-6">
                    <div className="flex flex-column gap-2">
                      <label
                        htmlFor="First_name"
                        className="text-xl text-600 font-semibold"
                      >
                        First Name
                      </label>

                      <input
                        type="text"
                        id="First_name"
                        placeholder="Enter First Name"
                        className="w-full h-4rem text-xl p-3 bg-gray-100 border-1 border-500 border-round-md"
                      />
                    </div>
                  </div>
                  <div className="w-12 md:w-6">
                    <div className="flex flex-column gap-2">
                      <label
                        htmlFor="First_name"
                        className="text-xl text-600 font-semibold"
                      >
                         Last Name
                      </label>

                      <input
                        type="text"
                        id="First_name"
                        placeholder="Enter Last Name"
                        className="w-full h-4rem text-xl p-3 bg-gray-100 border-1 border-500 border-round-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-column md:flex-row gap-3 md:gap-8">
                  <div className="w-12 md:w-6">
                    <div className="flex flex-column gap-2">
                      <label
                        htmlFor="First_name"
                        className="text-xl text-600 font-semibold"
                      >
                        Email
                      </label>

                      <input
                        type="text"
                        id="First_name"
                        placeholder="Enter Email Address"
                        className="w-full h-4rem text-xl p-3 bg-gray-100 border-1 border-500 border-round-md"
                      />
                    </div>
                  </div>
                  <div className="w-12 md:w-6">
                    <div className="flex flex-column gap-2">
                      <label
                        htmlFor="First_name"
                        className="text-xl text-600 font-semibold"
                      >
                        Password
                      </label>

                      <input
                        type="text"
                        id="First_name"
                        placeholder="Enter Password"
                        className="w-full h-4rem text-xl p-3 bg-gray-100 border-1 border-500 border-round-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-content-end mt-4">
                <button className="w-full md:w-15rem py-3 px-6 bg-blue-500 text-white border-round-md text-xl border-none cursor-pointer">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </Scrollbars>
      </div>
    </div>
  );
}
