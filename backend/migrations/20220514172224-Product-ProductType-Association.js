"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("products", {
      fields: ["productType_id"],
      type: "foreign key",
      name: "fk_product_productType_id",
      references: {
        table: "productType",
        field: "id",
      },
      onDelete: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("products", {
      fields: ["productType_id"],
      type: "foreign key",
      name: "fk_product_productType_id",
      references: {
        table: "productType",
        field: "id",
      },
      onDelete: "cascade",
    });
  },
};
