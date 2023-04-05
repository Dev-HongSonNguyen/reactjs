import React, { useEffect, useState } from "react";
import { getOneProduct } from "../api/products";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Iproduct } from "../interface/Iproduct";

const ProductDetail = () => {
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
  return (
    <div className="bg-current">
      <p className="text-center text-[#ffff]">Detail Product</p>
      <div className="max-w-6xl m-auto">
        <header className="content text-[#ffff]">Header</header>
        <div className="content grid grid-cols-4 gap-3">
          <div className="">
            <img className="" src={product.image} alt="" />
            <a href="" className="text-[#ffff]">
              {product.name}
            </a>
            <p className="text-[#ffff]">{product.price}</p>
            <p className="text-[#ffff] text-justify">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
