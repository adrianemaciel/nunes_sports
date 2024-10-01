const express = require("express");
const router = express.Router();
const productController = require("../controllers/productControler");

router.get("/products", productController.listProducts);

router.post("/products", productController.createProduct);

router.put("/products/:id", productController.updateProduct);

router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
