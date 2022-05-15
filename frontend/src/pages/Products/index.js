import React, { useEffect, useState } from "react";

import Layout from "../../components/Layout";
import MetaDecorator from "../../utils/MetaDecorator";
import Card from "../../components/Card";
import CardGroup from "react-bootstrap/CardGroup";

import apiCalls from "../../apiCalls";

import ProductsStyles from "./Products.module.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsAll = async () => {
      const response = await apiCalls.products();
      setProducts(response.data);
    };
    productsAll();
  }, []);
  return (
    <>
      <MetaDecorator title="Home - iBoo Challenge" />
      <Layout>
        <div className={ProductsStyles.mainContainer}>
          <h1 className={ProductsStyles.title}>Nuestros productos</h1>

          {products.length > 0 && (
            <CardGroup className={ProductsStyles.cardGroup}>
              {products.map((product, i) => {
                return <Card product={product} key={`product_${i}`} />;
              })}
            </CardGroup>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Products;
