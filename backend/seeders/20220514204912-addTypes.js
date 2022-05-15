"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const types = [{ name: "Transporte" }, { name: "Hogar" }, { name: "Ropa" }];

    await queryInterface.bulkInsert("productType", types, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("productType", null, {});
  },
};
