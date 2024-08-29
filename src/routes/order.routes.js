const express = require("express");
const orderRouter = express.Router();
const OrderController = require("../controllers/order.controller.js");

orderRouter
  .get("/", OrderController.getAllOrders)
  .get("/:id", OrderController.getOrderById)
  .post("/add", OrderController.createOrder)
  .put("/update/:id", OrderController.updateOrder)
  .delete("/delete/:id", OrderController.deleteOrder);

module.exports = orderRouter;
