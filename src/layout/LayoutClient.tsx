import { Button } from "antd";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const LayoutClient = () => {
  //check Login
  const checkLogin = () => {
    const user = localStorage.getItem("users");
    return user !== null;
  };
  const hideButtons = checkLogin() ? { display: "none" } : {};
  return (
    <div
      style={{
        fontFamily: "'Bebas Neue', cursive",
        backgroundColor: "#0b111f",
        // height: "2000px",
      }}
    >
      <div className="header bg-[#171F32]">
        <div className="header max-w-6xl m-auto  ">
          <div className="nav flex justify-between p-2 items-center">
            <div className="logo col">
              <Link to={`/`} className="text-[#ffff] text-[50px]">
                Logo
              </Link>
            </div>
            <ul className="flex gap-3">
              <li>
                <button
                  style={hideButtons}
                  className="text-[#ffff] bg-[#0b111f] px-5 py-2 rounded-md"
                >
                  <Link to={`/signin`}>Sign in</Link>
                </button>
              </li>
              <li>
                <button
                  style={hideButtons}
                  className="text-[#ffff] bg-[#0b111f] px-5 py-2 rounded-md"
                >
                  <Link to={`/signup`}>Sign up</Link>
                </button>
              </li>
              <li>
                <button className="text-[#ffff] bg-[#0b111f] px-5 py-2 rounded-md">
                  <Link to={`/admin`}>Admin</Link>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Outlet />
      <div className="bg-[#171F32]">
        <div className="footer max-w-6xl m-auto mt-[100px] py-[100px]">
          <div className="text-[#fff] text-center">FOOTER</div>
        </div>
      </div>
    </div>
  );
};

export default LayoutClient;
