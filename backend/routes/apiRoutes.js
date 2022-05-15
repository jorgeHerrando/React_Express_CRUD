const express = require("express");
const router = express.Router();

const path = require("path");
// para poder subir imagenes
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// para poder subir imagenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname + "/../public/img")); //ruta donde se guardarán los archivos subidos
  },
  // esto lo hace por cada file. Para acceder a un array se hace desde req.fileS
  filename: (req, file, cb) => {
    let uniqueName = uuidv4();
    let fileName = `${uniqueName}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

let upload = multer({ storage: storage });

// ************ Controller Require ************
const apiController = require("../controllers/apiController");

// ALL PRODUCTS
router.get("/catalog/products", apiController.allProducts);

// GET TYPES OF PRODUCTS
router.get("/productTypes", apiController.productTypes);

// GET ONE PRODUCT
router.get("/catalog/product/:uuid", apiController.productDetail);

// CREATE PRODUCT
router.post("/createProduct", upload.single("image"), apiController.create);

// FIND PRODUCT BY ID OR NAME
router.get("/product/find", apiController.find);

// UPDATE PRODUCT
router.put("/editProduct/:uuid", upload.single("image"), apiController.update);

// DELETE PRODUCT
router.delete("/product/:uuid", apiController.deleteProduct);

module.exports = router;
