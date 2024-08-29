const Contract = require("../models/contract.models.js");

class ContractController {
  createContract = async (req, res) => {
    try {
      const contract = await Contract.create(req.body);
      res.status(201).send({
        message: "Contract created successfully",
        data: contract,
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed to create contract",
        error: error.message,
      });
    }
  };

  getAllContracts = async (req, res) => {
    try {
      const contracts = await Contract.find()
        .populate("customer_id")
        .populate("order_id");
      res.status(200).send({
        message: "Contracts retrieved successfully",
        data: contracts,
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed to retrieve contracts",
        error: error.message,
      });
    }
  };

  getContractById = async (req, res) => {
    try {
      const contract = await Contract.findById(req.params.id)
        .populate("customer_id")
        .populate("order_id");
      if (!contract) {
        return res.status(404).send({ message: "Contract not found" });
      }
      res.status(200).send({
        message: "Contract retrieved successfully",
        data: contract,
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed to retrieve contract",
        error: error.message,
      });
    }
  };

  updateContract = async (req, res) => {
    try {
      const contract = await Contract.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      if (!contract) {
        return res.status(404).send({ message: "Contract not found" });
      }
      res.status(200).send({
        message: "Contract updated successfully",
        data: contract,
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed to update contract",
        error: error.message,
      });
    }
  };

  deleteContract = async (req, res) => {
    try {
      const contract = await Contract.findByIdAndDelete(req.params.id);
      if (!contract) {
        return res.status(404).send({
          message: "Contract not found",
        });
      }
      res.status(200).send({
        message: "Contract deleted successfully",
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed to delete contract",
        error: error.message,
      });
    }
  };
}

module.exports = new ContractController();
