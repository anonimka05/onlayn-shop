const Payment = require("../models/payment.models.js");
const Order = require("../models/order.models.js");

class PaymentController {
  createPayment = async (req, res) => {
    try {
      const payment = await Payment.create(req.body);
      res.status(201).send({
        message: "Payment created successfully",
        data: payment,
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed to create payment",
        error: error.message,
      });
    }
  };

  getAllPayments = async (_, res) => {
    try {
      const payments = await Payment.find().populate("contract_id");
      res.status(200).send({
        message: "Payments retrieved successfully",
        data: payments,
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed to retrieve payments",
        error: error.message,
      });
    }
  };

  getPaymentById = async (req, res) => {
    try {
      const payment = await Payment.findById(req.params.id).populate(
        "contract_id"
      );
      if (!payment) {
        return res.status(404).send({ message: "Payment not found" });
      }
      res.status(200).send({
        message: "Payment retrieved successfully",
        data: payment,
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed to retrieve payment",
        error: error.message,
      });
    }
  };

  getOverduePayments = async (_, res) => {
    try {
      const today = new Date();
      const overduePayments = await Payment.find({
        payment_date: { $lt: today },
        amount_paid: { $lt: { $expr: "$contract_id.total_amount" } },
      }).populate("contract_id");

      const overduePaymentsWithDays = overduePayments.map((payment) => {
        const overdueDays = Math.ceil(
          (today - payment.payment_date) / (1000 * 60 * 60 * 24)
        );
        return {
          ...payment._doc,
          overdueDays,
        };
      });

      res.status(200).send({
        message: "Overdue payments retrieved successfully",
        data: overduePaymentsWithDays,
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed to retrieve overdue payments",
        error: error.message,
      });
    }
  };

  getDeatlineNearPayments = async (_, res) => {
    try {
      const today = new Date();
      const overduePayments = await Payment.find({
        payment_date: { $lt: today },
        amount_paid: { $lt: { $expr: "$contract_id.total_amount" } },
      }).populate("contract_id");

      const overduePaymentsWithDays = overduePayments.map((payment) => {
        const overdueDays = Math.ceil(
          (today - payment.payment_date) / (1000 * 60 * 60 * 24)
        );
        return {
          ...payment._doc,
          overdueDays,
        };
      });

      res.status(200).send({
        message: "Overdue payments retrieved successfully",
        data: overduePaymentsWithDays,
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed to retrieve overdue payments",
        error: error.message,
      });
    }
  };

  updatePayment = async (req, res) => {
    try {
      const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!payment) {
        return res.status(404).send({ message: "Payment not found" });
      }
      res.status(200).send({
        message: "Payment updated successfully",
        data: payment,
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed to update payment",
        error: error.message,
      });
    }
  };

  deletePayment = async (req, res) => {
    try {
      const payment = await Payment.findByIdAndDelete(req.params.id);
      if (!payment) {
        return res.status(404).send({
          message: "Payment not found",
        });
      }
      res.status(200).send({
        message: "Payment deleted successfully",
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed to delete payment",
        error: error.message,
      });
    }
  };

  getOverduePayments = async (_, res) => {
    try {
      const today = new Date();
      const overduePayments = await Payment.find({
        payment_date: { $lt: today }, 
        amount_paid: { $lt: { $expr: "$contract_id.total_amount" } }, 
      }).populate("contract_id");

      res.status(200).send({
        message: "Overdue payments retrieved successfully",
        data: overduePayments,
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed to retrieve overdue payments",
        error: error.message,
      });
    }
  };
}

module.exports = new PaymentController();
