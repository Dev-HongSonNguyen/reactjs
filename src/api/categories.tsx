import instance from "./instance";
const getAllCategory = () => {
  return instance.get("/categories");
};
const getOneCategory = (id: any) => {
  return instance.get("/categories/" + id);
};
const deleteCategory = (id: any) => {
  return instance.delete("/categories/" + id);
};
const updateCategory = (category: any) => {
  return instance.put(`/categories/${category._id}`, category);
};
const addCategory = (category: any) => {
  return instance.post("/categories", category);
};
export {
  getAllCategory,
  getOneCategory,
  deleteCategory,
  updateCategory,
  addCategory,
};
