import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import LayoutAdmin from "./layout/LayoutAdmin";
import Dashboard from "./pages/admin/Dashboard";
import ProductManagers from "./pages/admin/ProductManagers";
import ProductAddAdmin from "./pages/admin/ProductAddAdmin";
import { Iproduct } from "./interface/Iproduct";
import ProductUpdateAdmin from "./pages/admin/ProductUpdateAdmin";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "./api/products";
import CategoryManagers from "./pages/admin/CategoryManagers";
import CategoryAddAdmin from "./pages/admin/CategoryAddAdmin";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "./api/categories";
import { Icategory } from "./interface/Icategory";
import CategoryUpdateAdmin from "./pages/admin/CategoryUpdateAdmin";
import LayoutClient from "./layout/LayoutClient";
import HomePage from "./pages/HomePage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProductDetail from "./pages/ProductDetail";

function App() {
  const navigate = useNavigate();
  const [product, setProduct] = useState<Iproduct[]>([]);
  const [categories, setCategory] = useState<Icategory[]>([]);
  // call api product
  useEffect(() => {
    try {
      getAllProduct().then(({ data }) => {
        const newProduct = data.products;
        setProduct(newProduct.docs);
      });
    } catch (error) {}
  }, []);
  // call api category
  useEffect(() => {
    try {
      getAllCategory().then(({ data }) => setCategory(data.category));
    } catch (error) {}
  }, []);
  //delete product
  const handelRemoveProduct = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa không !")) {
      deleteProduct(id).then(() => {
        const newProduct = product.filter((item) => item._id !== id);
        setProduct(newProduct);
      });
    }
  };
  //add product
  const addNewProduct = (product: Iproduct) => {
    try {
      addProduct(product);
      // alert("Add New Product Successfully !");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };
  // update product
  const updateProducts = (product: Iproduct) => {
    updateProduct(product);
    // alert("Update Successfully !");
    navigate("/admin/products");
  };
  // add category
  const addNewCategory = (category: Icategory) => {
    addCategory(category);
    // alert("Add New Category Successfully !");
    navigate("/admin/categories");
  };
  //delete category
  const handelRemoveCategory = (id: string) => {
    if (
      confirm(
        "Bạn có chắc chắn muốn xóa không ! Nếu bạn xóa thì toàn bộ danh sản phẩm sẽ bị xóa"
      )
    ) {
      deleteCategory(id);
    }
    // alert("Delete Successfully !");
  };
  const updateCategories = (category: Icategory) => {
    updateCategory(category);
    // alert("Update Category Succesfully !");
    navigate("/admin/categories");
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<HomePage product={product} />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="products">
            <Route
              index
              element={
                <ProductManagers
                  product={product}
                  removeProduct={handelRemoveProduct}
                  setProduct={setProduct}
                  category={categories}
                />
              }
            />
            <Route
              path="add"
              element={
                <ProductAddAdmin
                  addProduct={addNewProduct}
                  categories={categories}
                />
              }
            />
            <Route
              path="update/:id"
              element={
                <ProductUpdateAdmin
                  updateProducts={updateProducts}
                  products={product}
                  category={categories}
                />
              }
            />
          </Route>
          <Route path="categories">
            <Route
              index
              element={
                <CategoryManagers
                  category={categories}
                  setCategory={setCategory}
                  removeCategory={handelRemoveCategory}
                />
              }
            />
            <Route
              path="add"
              element={<CategoryAddAdmin addCategory={addNewCategory} />}
            />
            <Route
              path="update/:id"
              element={<CategoryUpdateAdmin updateCate={updateCategories} />}
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
