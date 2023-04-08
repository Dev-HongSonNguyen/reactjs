import React, { useEffect, useState } from "react";
import { getOneProduct } from "../api/products";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Rate } from "antd";
import { Iproduct } from "../interface/Iproduct";

const ProductDetail = () => {
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [value, setValue] = useState(5);
  const { id } = useParams();
  const [product, setProduct] = useState({
    _id: "",
    image: "",
    name: "",
    price: "",
    description: "",
  });
  useEffect(() => {
    axios
      .get(`http://localhost:8080/products/${id}`)
      .then(({ data }) => setProduct(data.product));
  }, []);
  console.log(product);

  return (
    <div>
      <div className="max-w-6xl m-auto pt-[20px] text-[#ffff]">
        <Link to={`/`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
        </Link>
      </div>

      <h1 className="text-center text-[#ffff] text-[40px] py-[30px]">
        DETAIL PRODUCT
      </h1>
      <div className="content max-w-6xl m-auto grid grid-cols-2 gap-10 pb-[50px]">
        <div className="bg-[#171F32] px-5 py-[40px] rounded-md">
          <img className="w-[400px] m-auto" src={product.image} alt="" />
        </div>
        <div className="">
          <div className="">
            <a href="" className="text-[#fff] text-[40px]">
              {product.name}
            </a>
            <br />
            <div className="price text-[#B22222] text-[30px]">
              <span>$</span>
              {product.price}
            </div>
            <span>
              <Rate
                tooltips={desc}
                onChange={setValue}
                value={value}
                style={{ fontSize: "20px", paddingBottom: "20px" }}
              />
            </span>
            <div className="text-[#ffff] text-justify tracking-wider">
              {product.description}
            </div>
            <button className="text-[#ffff] border border-[#ffff] px-3 py-1 text-[20px] mt-[20px]">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
