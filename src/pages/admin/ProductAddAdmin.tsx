import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, InputNumber, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Iproduct } from "../../interface/Iproduct";
import { Icategory } from "../../interface/Icategory";
import { getOneProduct } from "../../api/products";
import { useParams } from "react-router-dom";
const { Option } = Select;

interface ProductAddAdmin {
  addProduct: (product: Iproduct) => void;
  categories: Icategory[];
}
const ProductAddAdmin = (props: ProductAddAdmin) => {
  const onFinish = (values: any) => {
    console.log(values);
    props.addProduct(values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          { required: true, message: "Please input your name!" },
          { whitespace: true, message: "Truonng name bat buoc phai nhap" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Image"
        name="image"
        rules={[{ required: true, message: "Please input your image" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please input your price" }]}
      >
        <InputNumber min={0} />
      </Form.Item>
      {/* //////option */}

      <Form.Item
        label="Category"
        name="categoryId"
        rules={[
          {
            required: true,
            message: "Please select an option",
          },
        ]}
      >
        <Select>
          $
          {props.categories.map((item) => {
            return <Option value={item._id}>{item.name}</Option>;
          })}
        </Select>
      </Form.Item>
      {/* //////option */}
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please input your description" }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="default" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductAddAdmin;
