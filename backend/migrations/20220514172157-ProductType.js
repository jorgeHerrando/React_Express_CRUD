"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("productType", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("productType");
  },
};
