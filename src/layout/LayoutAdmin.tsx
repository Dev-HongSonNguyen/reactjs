import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  MenuOutlined,
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
import { Link, Outlet, useNavigate } from "react-router-dom";

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
  getItem("Product", "sub1", <MenuOutlined />, [
    getItem(<Link to={`/admin/products`}>List Products</Link>, "1"),
    getItem(<Link to={`/admin/products/add`}>Add New Product</Link>, "2"),
  ]),
  getItem("Category", "sub2", <MenuOutlined />, [
    getItem(<Link to={`/admin/categories`}>List Categories</Link>, "3"),
    getItem(<Link to={`/admin/categories/add`}>Add New Category</Link>, "4"),
  ]),
  getItem(<Link to={`/`}>Back To</Link>, "sub3", <UserOutlined />),
];

const LayoutAdmin = () => {
  const navigate = useNavigate();
  //dang xuat
  const handelLogout = () => {
    localStorage.removeItem("users");
    alert("Đăng xuất thành công");
    navigate("/signin");
  };
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh", fontFamily: "'Bebas Neue', cursive" }}>
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
            paddingLeft: 20,
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="">ĐÂY LÀ TRANG ADMIN</div>
          <div className="">
            <button className="btn btn-success" onClick={handelLogout}>
              Logout
            </button>
          </div>
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
