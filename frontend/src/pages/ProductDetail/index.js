import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import Layout from "../../components/Layout";
import MetaDecorator from "../../utils/MetaDecorator";
import ModalDelete from "../../components/ModalDelete";

import Button from "react-bootstrap/Button";
import detailStyles from "./ProductDetail.module.css";

import apiCalls from "../../apiCalls";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (id) {
      const productDetail = async () => {
        const response = await apiCalls.productDetail(id);
        setProduct(response.data);
      };
      productDetail();
    }
  }, [id]);

  return (
    <>
      <MetaDecorator title="Detalle Producto - iBoo Challenge" />
      <Layout>
        <div className={detailStyles.container}>
          {product ? (
            <>
              <h2 className={detailStyles.title}>{product.name}</h2>
              <div className={detailStyles.productContainer}>
                <div className={detailStyles.imageContainer}>
                  <img
                    src={`${process.env.REACT_APP_STATIC_URL}/img/${product.image}`}
                    alt={product.name}
                  />
                </div>
                <div className={detailStyles.infoProduct}>
                  <div className={detailStyles.descriptionContainer}>
                    <p className={detailStyles.titleInfo}>Descripción: </p>
                    <p className={detailStyles.textInfo}>
                      {product.description}
                    </p>
                  </div>

                  <div className={detailStyles.descriptionContainer}>
                    <p className={detailStyles.titleInfo}>
                      Categoría de producto:
                    </p>
                    <p className={detailStyles.textInfo}>{product.type.name}</p>
                  </div>

                  <div className={detailStyles.descriptionContainer}>
                    <p className={detailStyles.titleInfo}>Peso:</p>
                    <p className={detailStyles.textInfo}>{product.weight} Kg</p>
                  </div>
                </div>
              </div>
              <div className={detailStyles.buttonContainer}>
                <Link
                  to={`/editProduct/${product.id}`}
                  className={detailStyles.buttonEditContainer}
                >
                  <Button
                    variant="secondary"
                    className={detailStyles.buttonEdit}
                  >
                    Editar
                  </Button>
                </Link>

                <Button
                  variant="danger"
                  className={detailStyles.buttonDelete}
                  onClick={() => setModalShow(true)}
                >
                  Eliminar
                </Button>
              </div>
            </>
          ) : (
            <h2 className={detailStyles.title}>Cargando...</h2>
          )}
        </div>
        {product && (
          <ModalDelete
            show={modalShow}
            onHide={() => setModalShow(false)}
            id={product.id}
          />
        )}
      </Layout>
    </>
  );
};

export default ProductDetail;
