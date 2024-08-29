const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  order_date: {
    type: Date,
    default: Date.now,
  },
  address: {
    type: String,
    required: true,
  },
  ship_via: {
    type: String,
    required: true,
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
