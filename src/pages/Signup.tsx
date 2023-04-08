import React, { useEffect, useState } from "react";
import type { CascaderProps } from "antd";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Signup = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    try {
      await axios.post("http://localhost:8080/signup", values);
      alert("Đăng ký thành công !");
      navigate("/signin");
    } catch (error) {
      alert("Đăng ký thất bại ! Vui lòng kiểm tra lại");
    }
  };
  //   const Signin = async (event: any) => {
  //     event.preventDeffault();
  //     try {
  //       await axios.post("http://localhost:8080/signup", values);
  //     } catch (error) {}
  //   };
  return (
    <div className="pb-[50px]">
      <p
        className="text-center text-[#ffff] text-[40px]"
        style={{ fontFamily: "'Bebas Neue', cursive", paddingTop: "50px" }}
      >
        Register
      </p>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "86",
        }}
        style={{
          width: 400,
          margin: "auto",
          // backgroundColor: "#171F32",
        }}
        scrollToFirstError
      >
        <p
          style={{ fontFamily: "'Bebas Neue', cursive" }}
          className="text-[#ffff]"
        >
          NAME PRODUCT
        </p>
        <Form.Item
          label=""
          name="name"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
        >
          <Input style={{ width: "400px" }} />
        </Form.Item>
        <p
          style={{ fontFamily: "'Bebas Neue', cursive" }}
          className="text-[#ffff]"
        >
          EMAIL
        </p>
        <Form.Item
          name="email"
          label=""
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input style={{ width: "400px" }} />
        </Form.Item>
        <p
          style={{ fontFamily: "'Bebas Neue', cursive" }}
          className="text-[#ffff]"
        >
          PASSWORD
        </p>
        <Form.Item
          name="password"
          label=""
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password style={{ width: "400px" }} />
        </Form.Item>
        <p
          style={{ fontFamily: "'Bebas Neue', cursive" }}
          className="text-[#ffff]"
        >
          CONFIRM PASSWORD
        </p>
        <Form.Item
          name="confirmPassword"
          label=""
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password style={{ width: "400px" }} />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            className="bg-[#ffff] text-[#171F32]"
            type="primary"
            htmlType="submit"
            style={{ fontFamily: "'Bebas Neue', cursive", width: "130px" }}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
