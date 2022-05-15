module.exports = (sequelize, dataTypes) => {
  let alias = "Product";

  let cols = {
    id: {
      type: dataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: dataTypes.UUIDV4,
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: dataTypes.STRING,
    },
    weight: {
      type: dataTypes.INTEGER,
    },
    enabled: {
      type: dataTypes.BOOLEAN,
    },
    image: {
      type: dataTypes.STRING,
    },
  };

  let config = {
    tableName: "products",
    timestamps: false,
    deletedAt: false,
  };

  const Product = sequelize.define(alias, cols, config);

  Product.associate = (models) => {
    // Users
    Product.belongsTo(models.ProductType, {
      as: "type",
      foreignKey: "productType_id",
    });
  };

  return Product;
};
