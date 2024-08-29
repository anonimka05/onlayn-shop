const { Router } = require("express");
const productController = require("../controllers/product.controller");

const productRouter = Router();

productRouter
  .get("/", productController.getAllProducts)
  .get("/stats", productController.getProductsStats)
  .post("/add", productController.createProduct)
  .put("/update/:id", productController.updateProduct)
  .delete("delete/:id", productController.deleteProduct);

module.exports = productRouter;
