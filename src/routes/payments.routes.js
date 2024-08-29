const express = require("express");
const paymentRouter = express.Router();
const PaymentController = require("../controllers/payment.controller.js");

paymentRouter
  .post("/add", PaymentController.createPayment)
  .get("/", PaymentController.getAllPayments)
  .get("/:id", PaymentController.getPaymentById)
  .get("/overdue-payments", PaymentController.getOverduePayments)
  .put("/update/:id", PaymentController.updatePayment)
  .delete("/delete/:id", PaymentController.deletePayment);

module.exports = paymentRouter;
