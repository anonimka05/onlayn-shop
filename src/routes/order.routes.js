const express = require("express");
const orderRouter = express.Router();
const OrderController = require("../controllers/order.controller.js");

orderRouter
  .post("/add", OrderController.createOrder)
  .get("/", OrderController.getAllOrders)
  .get("/:id", OrderController.getOrderById)
  .put("/update/:id", OrderController.updateOrder)
  .delete("/delete/:id", OrderController.deleteOrder);

module.exports = orderRouter;
