import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, InputNumber, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Iproduct } from "../../interface/Iproduct";
import { Icategory } from "../../interface/Icategory";
import { useParams } from "react-router-dom";
import { getOneProduct } from "../../api/products";
const { Option } = Select;
interface ProductUpdateAdmin {
  updateProducts: (product: Iproduct) => void;
  products: Iproduct[];
  category: Icategory[];
}
const ProductUpdateAdmin = (props: ProductUpdateAdmin) => {
  const { id } = useParams();
  const product = props.products.find((item) => item._id === id);
  const [form] = Form.useForm();
  form.setFieldsValue({
    _id: product?._id,
    name: product?.name,
    image: product?.image,
    price: product?.price,
    description: product?.description,
    categoryId: product?.categoryId,
  });
  const onFinish = (values: any) => {
    props.updateProducts(values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
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
        label="ID Product"
        name="_id"
        rules={[{ required: true, message: "Please input your id!" }]}
        style={{ display: "none" }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
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
      {/* <Form.Item
        label="Category"
        name="categoryId"
        rules={[{ required: true, message: "Please input your image" }]}
      >
        <Input />
      </Form.Item> */}
      <Form.Item
        name="categoryId"
        label="Category"
        rules={[{ required: true }]}
      >
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          {props.category.map((item) => {
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

export default ProductUpdateAdmin;
