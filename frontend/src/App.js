import React from "react";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import "./App.css";

import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/productDetail/:id" element={<ProductDetail />} />
        <Route path="/createProduct" element={<CreateProduct />} />
        <Route path="/editProduct/:id" element={<EditProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
