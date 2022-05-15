// para trabajar con la DB
const { sequelize } = require("../models");
const db = require("../models");

const Op = db.Sequelize.Op;

const apiController = {
  // ALL PRODUCTS
  allProducts: async (req, res) => {
    try {
      const products = await db.Product.findAll({
        include: [{ association: "type" }],
      });
      const enabled = products.filter((product) => product.enabled == true);

      if (enabled.length > 0) {
        res.status(200).send({
          status: "success",
          data: enabled,
        });
      } else {
        res.status(404).send({
          status: "error",
          message: "No products found",
        });
      }
    } catch (e) {
      res.status(500).send({
        status: "error",
        message: "Internal server error",
      });
    }
  },

  // GET TYPES OF PRODUCT
  productTypes: async (req, res) => {
    try {
      const types = await db.ProductType.findAll({ order: [["id", "ASC"]] });
      if (types.length > 0) {
        res.status(200).send({
          status: "success",
          data: types,
        });
      } else {
        res.status(404).send({
          status: "error",
          message: "No product types found",
        });
      }
    } catch (e) {
      res.status(500).send({
        status: "error",
        message: "Internal server error",
      });
    }
  },

  // FIND PRODUCT
  find: async (req, res) => {
    //   si viene algo
    if (req.query.search) {
      //   busco por id
      try {
        const isThereAnyId = await db.Product.findOne({
          where: { id: req.query.search },
        });
        const foundByWord = await db.Product.findAll({
          where: {
            name: {
              [Op.like]: `%${req.query.search}%`,
            },
            description: {
              [Op.like]: `%${req.query.search}%`,
            },
          },
        });

        //   busco por palabra en nombre y descripcion
        if (isThereAnyId) {
          res.status(200).send({
            status: "success",
            data: [isThereAnyId],
          });
        } else if (foundByWord.length > 0) {
          res.status(200).send({
            status: "success",
            data: foundByWord,
          });
        } else {
          res.status(404).send({
            status: "error",
            error: "No se encontró ningún producto asociado a su búsqueda",
          });
        }
      } catch (e) {
        res.status(500).send({
          status: "error",
          message: "Internal server error",
        });
      }
    } else {
      res.status(400).send({
        status: "error",
        error: "Por favor, ingrese una palabra para buscar",
      });
    }
  },

  // CREATE PRODUCT
  create: async (req, res) => {
    try {
      const newProduct = await db.Product.create({
        name: req.body.name,
        description: req.body.description,
        productType_id: Number(req.body.productType),
        image: req.file ? req.file.filename : "default.png",
        weight: Number(req.body.weight),
        enabled: req.body.enabled === "true" ? true : false,
      });

      res.status(200).send({
        status: "success",
        data: { product: newProduct, message: "Producto creado con éxito" },
      });
    } catch (e) {
      res.status(500).send({
        status: "error",
        message: "Internal server error",
      });
    }
  },

  // GET ONE PRODUCT
  productDetail: async (req, res) => {
    const id = req.params.uuid;
    try {
      const product = await db.Product.findOne({
        where: { id: id },
        include: [{ association: "type" }],
      });
      if (product) {
        res.status(200).send({
          status: "success",
          data: product,
        });
      } else {
        res.status(404).send({
          status: "error",
          message: "Product not found",
        });
      }
    } catch (e) {
      res.status(500).send({
        status: "error",
        message: "Internal server error",
      });
    }
  },

  // UPDATE PRODUCT
  update: async (req, res) => {
    const id = req.params.uuid;

    try {
      const product = await db.Product.findOne({
        where: { id: id },
        include: [{ association: "type" }],
      });
      console.log(product.image);
      const productUpdated = await db.Product.update(
        {
          name: req.body.name,
          description: req.body.description,
          productType_id: Number(req.body.productType),
          weight: Number(req.body.weight),
          enabled: req.body.enabled === "true" ? true : false,
          image: req.file ? req.file.filename : product.image,
        },
        {
          where: { id: id },
        }
      );
      res.status(200).send({
        status: "success",
        data: {
          product: productUpdated,
          message: "Producto actualizado con éxito",
        },
      });
    } catch (e) {
      res.status(500).send({
        status: "error",
        message: "Internal server error",
      });
    }
  },

  // DELETE PRODUCT
  deleteProduct: async (req, res) => {
    const id = req.params.uuid;

    try {
      await db.Product.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).send({
        status: "success",
        data: {
          message: "Producto eliminado con éxito",
        },
      });
    } catch (e) {
      res.status(500).send({
        status: "error",
        message: "Internal server error",
      });
    }
  },
};

module.exports = apiController;
