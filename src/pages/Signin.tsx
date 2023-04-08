import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    try {
      await axios
        .post("http://localhost:8080/signin", values)
        .then(({ data }) => {
          const token = data.accessToken;
          localStorage.setItem("users", JSON.stringify(token));
          alert("Đăng nhập thành công !");
          navigate("/admin");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container pb-[200px]">
      <p
        className="text-center text-[#ffff] text-[40px]"
        style={{ fontFamily: "'Bebas Neue', cursive", paddingTop: "50px" }}
      >
        Login
      </p>
      <Form
        style={{ width: "30%", margin: "auto" }}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <p
          style={{ fontFamily: "'Bebas Neue', cursive" }}
          className="text-[#ffff]"
        >
          EMAIL
        </p>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="email"
          />
        </Form.Item>
        <p
          style={{ fontFamily: "'Bebas Neue', cursive" }}
          className="text-[#ffff]"
        >
          PASSWORD
        </p>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button bg-[#ffff] text-[#171F32]"
            style={{ fontFamily: "'Bebas Neue', cursive" }}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signin;
