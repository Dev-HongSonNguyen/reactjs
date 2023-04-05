import { Iproduct } from "../interface/Iproduct";
import instance from "./instance";
const getAllProduct = () => {
  return instance.get("/products");
};
const getOneProduct = (id: any) => {
  return instance.get("/products/" + id);
};
const deleteProduct = (id: any) => {
  return instance.delete("/products/" + id);
};
const updateProduct = (product: any) => {
  return instance.put(`/products/${product._id}`, product);
};
const addProduct = (product: any) => {
  return instance.post("/products", product);
};
export {
  getAllProduct,
  getOneProduct,
  deleteProduct,
  updateProduct,
  addProduct,
};
