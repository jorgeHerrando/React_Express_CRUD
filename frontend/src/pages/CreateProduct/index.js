import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout";
import MetaDecorator from "../../utils/MetaDecorator";
import Modal from "../../components/ModalSuccess";

import { Form, Button } from "react-bootstrap";
import createStyles from "./CreateProduct.module.css";

import apiCalls from "../../apiCalls";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const setField = (field, value) => {
    setForm({ ...form, [field]: value });

    if (!!errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  useEffect(() => {
    const typesAll = async () => {
      const response = await apiCalls.types();
      setTypes(response.data);
    };
    typesAll();
  }, []);

  const validateForm = () => {
    const { name, description, weight, productType, enabled } = form;
    const newErrors = {};

    if (!name) {
      newErrors.name = "El nombre es requerido";
    } else if (name.length < 3) {
      newErrors.name = "El nombre debe tener al menos 3 caracteres";
    }

    if (!description) {
      newErrors.description = "La descripción es requerida";
    } else if (description.length < 10) {
      newErrors.description =
        "La descripción debe tener al menos 10 caracteres";
    }

    if (!weight) {
      newErrors.weight = "El peso es requerido";
    } else if (weight <= 0) {
      newErrors.weight = "El peso debe ser mayor a 0";
    }

    if (!productType) {
      newErrors.productType = "El tipo de producto es requerido";
    }

    if (!enabled) {
      newErrors.enabled = "El estado es requerido";
    }

    return newErrors;
  };

  const handleFile = (e) => {
    setField("image", e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("productType", form.productType);
      formData.append("weight", form.weight);
      formData.append("enabled", form.enabled);
      formData.append("image", form.image);
      try {
        const response = await apiCalls.createProduct(formData);
        if (response.status === 200) {
          setShowModal(true);
          setTimeout(() => {
            setShowModal(false);
            navigate("/");
          }, 2500);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <MetaDecorator title="Crear Producto - iBoo Challenge" />
      <Layout>
        <section className={createStyles.container}>
          <h3 className={createStyles.title}>Crear producto</h3>
          <Form className={createStyles.form}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Introduzca un nombre"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                name="description"
                placeholder="Introduzca una descripción"
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="weight">
              <Form.Label>Peso</Form.Label>
              <Form.Control
                type="number"
                name="weight"
                placeholder="Introduzca peso en kg"
                value={form.weight}
                onChange={(e) => setField("weight", e.target.value)}
                isInvalid={!!errors.weight}
              />
              <Form.Control.Feedback type="invalid">
                {errors.weight}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="enabled">
              <Form.Label>Estado</Form.Label>
              <Form.Select
                className={!!errors.enabled && `${createStyles.redBorder}`}
                placeholder="Selecciona estado"
                required
                throwInvalidValueError={true}
                valueAs="id"
                name="enabled"
                defaultValue="noValue"
                value={form.enabled}
                onChange={(selected, e) => {
                  setField("enabled", selected.target.value);
                }}
              >
                <option value="noValue" disabled>
                  Selecciona estado
                </option>
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </Form.Select>
              <div className={createStyles.red}>{errors.enabled}</div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="productType">
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                className={!!errors.productType && `${createStyles.redBorder}`}
                placeholder="Selecciona estado"
                required
                throwInvalidValueError={true}
                valueAs="id"
                name="productType"
                defaultValue="noValue"
                value={form.productType}
                onChange={(selected) => {
                  setField("productType", selected.target.value);
                }}
              >
                <option value="noValue" disabled>
                  Selecciona categoría
                </option>
                {types &&
                  types.map((type, i) => {
                    return (
                      <option key={`type_${i}`} value={type.id}>
                        {type.name}
                      </option>
                    );
                  })}
              </Form.Select>
              <div className={createStyles.red}>{errors.productType}</div>
            </Form.Group>

            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Adjunte una imagen</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={(e) => handleFile(e)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Enviar
            </Button>
          </Form>
        </section>
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          message={"El producto ha sido creado satisfactoriamente"}
        />
      </Layout>
    </>
  );
};

export default CreateProduct;
