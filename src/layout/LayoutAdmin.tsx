import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  DoubleRightOutlined,
  PlusOutlined,
  AppstoreOutlined,
  LogoutOutlined,
  GoldOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const items: MenuItem[] = [
  getItem(<Link to={`/admin`}>Dashboard</Link>, "0", <PieChartOutlined />),
  // getItem("Products", "2", <DesktopOutlined />),
  getItem("Product", "sub1", <UserOutlined />, [
    getItem(<Link to={`/admin/products`}>List Products</Link>, "1"),
    getItem(<Link to={`/admin/products/add`}>Add New Product</Link>, "2"),
  ]),
  getItem("Category", "sub2", <UserOutlined />, [
    getItem(<Link to={`/admin/categories`}>List Categories</Link>, "3"),
    getItem(<Link to={`/admin/categories/add`}>Add New Category</Link>, "4"),
  ]),
  getItem(<Link to={`/`}>Back To</Link>, "sub3", <UserOutlined />),
  // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  // getItem('Files', '9', <FileOutlined />),
  // getItem(<Link to={`/admin`}>Dashboard</Link>, "1", <PieChartOutlined />),
  // getItem("Products", "sub2", <OrderedListOutlined />, [
  //   getItem(
  //     <Link to={`/admin/products`}>List Products</Link>,
  //     "2",
  //     <AppstoreOutlined />
  //   ),
  //   getItem(
  //     <Link to={`/admin/products/add`}>Add New Product</Link>,
  //     "3",
  //     <PlusOutlined />
  //   ),
  // ]),
  // getItem("Category", "sub3", <GoldOutlined />, [
  //   getItem(
  //     <Link to={`/admin/categories`}>List Categories</Link>,
  //     "4",
  //     <AppstoreOutlined />
  //   ),
  //   getItem(
  //     <Link to={`/admin/categories/add`}>Add New Category</Link>,
  //     "5",
  //     <PlusOutlined />
  //   ),
  // ]),
  // getItem("Files", "9", <FileOutlined />),
  // getItem(<Link to={`/`}>Client</Link>, "10", <UserOutlined />),
];

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        {/* <div className="">
          <LogoutOutlined />
        </div> */}
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            background: colorBgContainer,
            paddingLeft: 15,
            fontWeight: "bold",
          }}
        >
          DAY LA TRANG ADMIN
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item></Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
