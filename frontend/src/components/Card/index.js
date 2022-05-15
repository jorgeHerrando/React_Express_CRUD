import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

import cardStyles from "./Card.module.css";

export default function ProductCard({ product }) {
  return (
    <>
      {product && (
        <Link to={`/productDetail/${product.id}`}>
          <Card className={cardStyles.card}>
            <Card.Img
              variant="top"
              src={`${process.env.REACT_APP_STATIC_URL}/img/${product.image}`}
              className={cardStyles.cardImage}
            />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
            </Card.Body>
            <Card.Footer
              className={`${cardStyles.footerCard} ${
                product.type.name === "Transporte"
                  ? cardStyles.backgroundTransporte
                  : product.type.name === "Hogar"
                  ? cardStyles.backgroundHogar
                  : cardStyles.backgroundRopa
              }`}
            >
              <small className="text-muted">Peso: {product.weight} kg</small>
              <small className="text-muted">
                Categoría: {product.type.name}
              </small>
            </Card.Footer>
          </Card>
        </Link>
      )}
    </>
  );
}
