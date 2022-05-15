module.exports = (sequelize, dataTypes) => {
  let alias = "ProductType";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING,
    },
  };

  let config = {
    tableName: "productType",
    timestamps: false,
    deletedAt: false,
  };

  const ProductType = sequelize.define(alias, cols, config);

  ProductType.associate = (models) => {
    // Users
    ProductType.hasMany(models.Product, {
      as: "products",
      foreignKey: "productType_id",
    });
  };

  return ProductType;
};
