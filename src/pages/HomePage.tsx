import React, { useState } from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { Rate } from "antd";
import { Iproduct } from "../interface/Iproduct";
interface HomePage {
  product: Iproduct[];
}
const HomePage = (props: HomePage) => {
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [value, setValue] = useState(5);
  return (
    <div className="py-[50px]">
      <h1 className="text-center text-[#ffff] text-[40px] pb-[30px]">
        LIST PRODUCT
      </h1>
      <div className="content max-w-6xl m-auto grid grid-cols-4 gap-5">
        {props.product.map((item) => {
          return (
            <div className="bg-[#171F32] px-3 py-[40px] rounded-md">
              <Link to={`products/${item._id}`}>
                <img className="" src={item.image} alt="" />
              </Link>
              <div className="flex justify-between items-center pt-[20px]">
                <div className="">
                  <Link to={`products/${item._id}`}>
                    <a href="" className="text-[#fff]">
                      {item.name}
                    </a>
                  </Link>
                  <div className="price text-[#B22222]">
                    <span>$</span>
                    {item.price}
                  </div>
                </div>
                <div className="">
                  <button className="text-[#ffff] border border-[#ffff] px-3 py-1 text-[12px]">
                    Buy Now
                  </button>
                </div>
              </div>
              <span>
                <Rate
                  tooltips={desc}
                  onChange={setValue}
                  value={value}
                  style={{ fontSize: "20px" }}
                />
                {value ? (
                  <span
                    style={{ color: "white", fontSize: "10px" }}
                    className="ant-rate-text"
                  >
                    {desc[value - 1]}
                  </span>
                ) : (
                  ""
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
