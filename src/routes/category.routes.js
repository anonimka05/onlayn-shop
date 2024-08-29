const express = require("express");
const categoryRouter = express.Router();
const CategoryController = require("../controllers/category.controller.js");

categoryRouter
  .route("/")
  .get(CategoryController.getAllCategories)
  .post(CategoryController.createCategory)
  .put(CategoryController.updateCategory)
  .delete(CategoryController.deleteCategory);

module.exports = categoryRouter;
