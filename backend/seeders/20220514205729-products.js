"use strict";

const { uuid } = require("uuidv4");

module.exports = {
  async up(queryInterface, Sequelize) {
    const products = [
      {
        id: uuid(),
        name: "Producto 1 - Hogar",
        description: "Descripción del producto 1 - Hogar",
        weight: 100,
        enabled: true,
        productType_id: 2,
        image: "product1.jpg",
      },
      {
        id: uuid(),
        name: "Producto 2 - Hogar",
        description: "Descripción del producto 2 - Hogar",
        weight: 200,
        enabled: false,
        productType_id: 2,
        image: "product2.jpg",
      },
      {
        id: uuid(),
        name: "Producto 3 - Ropa",
        description: "Descripción del producto 3 - Ropa",
        weight: 300,
        enabled: true,
        productType_id: 3,
        image: "product3.jpg",
      },
      {
        id: uuid(),
        name: "Producto 4 - Ropa",
        description: "Descripción del producto 4 - Ropa",
        weight: 400,
        enabled: true,
        productType_id: 3,
        image: "product4.jpg",
      },
      {
        id: uuid(),
        name: "Producto 5 - Transporte",
        description: "Descripción del producto 5 - Transporte",
        weight: 500,
        enabled: true,
        productType_id: 1,
        image: "product5.jpg",
      },
      {
        id: uuid(),
        name: "Producto 6 - Transporte",
        description: "Descripción del producto 6 - Transporte",
        weight: 600,
        enabled: true,
        productType_id: 1,
        image: "product6.jpg",
      },
    ];
    await queryInterface.bulkInsert("products", products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
