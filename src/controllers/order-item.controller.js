const OrderItem = require("../models/orderItem.models.js");

class OrderItemController {
  createOrderItem = async (req, res) => {
    const orderItem = await OrderItem.create(req.body);
    res.status(201).send({
      message: "Order item created successfully",
      data: orderItem,
    });
  };

  getAllOrderItems = async (req, res) => {
    const orderItems = await OrderItem.find()
      .populate("product_id")
      .populate("orders_id");
    res.status(200).send({
      message: "Order items retrieved successfully",
      data: orderItems,
    });
  };

  getOrderItemById = async (req, res) => {
    const orderItem = await OrderItem.findById(req.params.id)
      .populate("product_id")
      .populate("orders_id");
    if (!orderItem) {
      return res.status(404).send({ message: "Order item not found" });
    }
    res.status(200).send({
      message: "Order item retrieved successfully",
      data: orderItem,
    });
  };

  updateOrderItem = async (req, res) => {
    const orderItem = await OrderItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!orderItem) {
      return res.status(404).send({ message: "Order item not found" });
    }
    res.status(200).send({
      message: "Order item updated successfully",
      data: orderItem,
    });
  };

  deleteOrderItem = async (req, res) => {
    const orderItem = await OrderItem.findByIdAndDelete(req.params.id);
    if (!orderItem) {
      return res.status(404).send({
        message: "Order item not found",
      });
    }
    res.status(200).send({
      message: "Order item deleted successfully",
    });
  };
}

module.exports = new OrderItemController();
