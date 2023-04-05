import React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { Iproduct } from "../interface/Iproduct";
interface HomePage {
  product: Iproduct[];
}
const HomePage = (props: HomePage) => {
  return (
    <div className="bg-current">
      <div className="max-w-6xl m-auto">
        <header className="content text-[#ffff]">
          {/* <div className="logo flex">
            <h1>CLIENT</h1>
            <div className="">
              <button>Sign in</button>
              <button>Sign in</button>
            </div>
          </div> */}
          Header
        </header>
        <div className="content grid grid-cols-4 gap-3">
          {props.product.map((item) => {
            return (
              <div className="">
                <img className="" src={item.image} alt="" />
                <Link className="text-[#ffff]" to={`/products/${item._id}`}>
                  {item.name}
                </Link>
                <p className="text-[#ffff]">{item.price}</p>
                <p className="text-[#ffff] text-justify">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to={`/admin`}>
            <Button type="primary">Admin</Button>
          </Link>
        }
      /> */}
    </div>
  );
};

export default HomePage;
