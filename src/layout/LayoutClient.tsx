import { Button } from "antd";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const LayoutClient = () => {
  return (
    <div>
      <div className="">
        <Button>
          <Link to={`/admin`}>Admin</Link>
          <br />
          <Link to={`/signin`}>Đăng nhập</Link>
          <br />
          <Link to={`/signup`}>Đăng ký</Link>
          <br />
        </Button>
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutClient;
