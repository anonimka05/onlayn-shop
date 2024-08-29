const express = require("express");
const orderItemController = require("../controllers/order-item.controller.js");

const orderRouter = express.Router();

orderRouter
  .get("/", orderItemController.getAllOrderItems)
  .get("/:id", orderItemController.getOrderItemById)
  .post("/add", orderItemController.createOrderItem)
  .put("/update/:userId", orderItemController.updateOrderItem)
  .delete("/delete/:userId", orderItemController.deleteOrderItem);

module.exports = orderRouter;
