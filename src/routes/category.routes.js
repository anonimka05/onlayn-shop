const express = require("express");
const categoryRouter = express.Router();
const CategoryController = require("../controllers/category.controller.js");
const categoryController = require("../controllers/category.controller.js");

categoryRouter
  .get("/", CategoryController.getAllCategories)
  .get("/:id", categoryController.getCategoryById)
  .get("/stats", categoryController.getCategoryStats)
  .post("/add", CategoryController.createCategory)
  .put("/udate/:id", CategoryController.updateCategory)
  .delete("/delete/:id", CategoryController.deleteCategory);

module.exports = categoryRouter;
