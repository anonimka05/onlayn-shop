const Order = require("../models/order.models.js");

class OrderController {
  createOrder = async (req, res) => {
    try {
      const order = await Order.create(req.body);
      res.status(201).send({
        message: "Order created successfully",
        data: order,
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed to create order",
        error: error.message,
      });
    }
  };

  getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find()
        .populate("product_id")
        .populate("customer_id");
      res.status(200).send({
        message: "Orders retrieved successfully",
        data: orders,
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed to retrieve orders",
        error: error.message,
      });
    }
  };

  getOrderById = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id)
        .populate("product_id")
        .populate("customer_id");
      if (!order) {
        return res.status(404).send({ message: "Order not found" });
      }
      res.status(200).send({
        message: "Order retrieved successfully",
        data: order,
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed to retrieve order",
        error: error.message,
      });
    }
  };

  updateOrder = async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!order) {
        return res.status(404).send({ message: "Order not found" });
      }
      res.status(200).send({
        message: "Order updated successfully",
        data: order,
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed to update order",
        error: error.message,
      });
    }
  };

  deleteOrder = async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) {
        return res.status(404).send({
          message: "Order not found",
        });
      }
      res.status(200).send({
        message: "Order deleted successfully",
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed to delete order",
        error: error.message,
      });
    }
  };
}

module.exports = new OrderController();
