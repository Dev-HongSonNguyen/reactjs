import React, { useEffect, useRef, useState } from "react";
import { Button, Space, Table, Popconfirm, message, Tag, Input } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { Iproduct } from "../../interface/Iproduct";
import { Icategory } from "../../interface/Icategory";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { getAllCategory } from "../../api/categories";
import { getAllProduct } from "../../api/products";
import Highlighter from "react-highlight-words";
import type { FilterConfirmProps } from "antd/es/table/interface";
import type { InputRef } from "antd";
interface ProductManagers {
  product: Iproduct[];
  removeProduct: (id: string) => void;
  setProduct: any;
  category: Icategory[];
}
//render lai
const ProductManagers = (props: ProductManagers) => {
  // const [pro, setPro] = useState([]);
  // useEffect(() => {
  //   axios.get("http://localhost:8080/products").then(({ data }) => {
  //     const newProduct = data.products;
  //     setPro(newProduct.docs);
  //   });
  // }, []);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="default"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<Iproduct> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img width="50px" height="50px" src={image} />,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      // sortOrder: "descend",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (categoryId) => {
        const cate = props.category.find((item) => item._id === categoryId);
        return cate ? cate.name : "";
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="default"
            danger
            onClick={() => props.removeProduct(record._id)}
          >
            Delete
          </Button>
          <Button type="default">
            <Link to={`/admin/products/update/${record._id}`}>Update</Link>
          </Button>
        </Space>
      ),
    },
  ];
  return <Table columns={columns} dataSource={props.product} />;
};

export default ProductManagers;
