import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { Icategory } from "../../interface/Icategory";
import { getOneCategory } from "../../api/categories";
import { useParams } from "react-router-dom";
interface CategoryUpdateAdmin {
  updateCate: (category: Icategory) => void;
}
const CategoryUpdateAdmin = (props: CategoryUpdateAdmin) => {
  const { id } = useParams();
  const [category, setCategory] = useState<Icategory>();
  useEffect(() => {
    getOneCategory(id).then(({ data }) => setCategory(data.category));
  }, []);
  console.log(category);

  const [form] = Form.useForm();
  form.setFieldsValue({
    _id: category?._id,
    name: category?.name,
  });
  const onFinish = (values: Icategory) => {
    console.log(values);
    props.updateCate(values);
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
        label="ID Category"
        name="_id"
        rules={[{ required: true, message: "Please input your id!" }]}
        style={{ display: "none" }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Name Category"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="default" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CategoryUpdateAdmin;
