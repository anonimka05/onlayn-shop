const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  payment_date: {
    type: Date,
    required: true,
  },
  amount_paid: {
    type: Number,
    required: true,
  },
  contract_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contract",
    required: true,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
