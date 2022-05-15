const axios = require("axios");

const apiCalls = {
  // ALL PRODUCTS
  products: async () => {
    try {
      const call = await fetch(
        `${process.env.REACT_APP_API_URL}/catalog/products`
      );
      const data = await call.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  // ONE PRODUCT
  productDetail: async (id) => {
    try {
      const call = await fetch(
        `${process.env.REACT_APP_API_URL}/catalog/product/${id}`
      );
      const data = await call.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  // GET TYPES
  types: async () => {
    try {
      const call = await fetch(`${process.env.REACT_APP_API_URL}/productTypes`);
      const data = await call.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  // CREATE PRODUCT
  createProduct: async (formData) => {
    try {
      const call = axios({
        url: `${process.env.REACT_APP_API_URL}/createProduct`,
        method: "POST",
        data: formData,
      });
      return call;
    } catch (e) {
      console.log(e);
    }
  },

  // EDIT PRODUCT
  editProduct: async (formData, id) => {
    try {
      const call = axios({
        url: `${process.env.REACT_APP_API_URL}/editProduct/${id}`,
        method: "PUT",
        data: formData,
      });
      return call;
    } catch (e) {
      console.log(e);
    }
  },

  // DELETE PRODUCT
  deleteProduct: async (id) => {
    try {
      const call = axios({
        url: `${process.env.REACT_APP_API_URL}/product/${id}`,
        method: "DELETE",
      });
      return call;
    } catch (e) {
      console.log(e);
    }
  },
};

export default apiCalls;
