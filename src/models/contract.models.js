const mongoose = require("mongoose");

const ContractSchema = new mongoose.Schema({
  contract_date: { type: Date, default: Date.now },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
  monthly_payment: {
    type: Number,
    required: true,
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  contract_type: {
    type: String,
    required: true,
  },
});

const Contract = mongoose.model("Contract", ContractSchema);

module.exports = Contract;
