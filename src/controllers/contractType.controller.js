const ContractType = require("../models/contract_type.moduls.js");

class ContractTypeController {
  createContractType = async (req, res) => {
    try {
      const contractType = await ContractType.create(req.body);
      res.status(201).send({
        message: "Contract type created successfully",
        data: contractType,
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed to create contract type",
        error: error.message,
      });
    }
  };

  getAllContractTypes = async (_, res) => {
    try {
      const contractTypes = await ContractType.find();
      res.status(200).send({
        message: "Contract types retrieved successfully",
        data: contractTypes,
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed to retrieve contract types",
        error: error.message,
      });
    }
  };

  getContractTypeById = async (req, res) => {
    try {
      const contractType = await ContractType.findById(req.params.id);
      if (!contractType) {
        return res.status(404).send({ message: "Contract type not found" });
      }
      res.status(200).send({
        message: "Contract type retrieved successfully",
        data: contractType,
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed to retrieve contract type",
        error: error.message,
      });
    }
  };

  updateContractType = async (req, res) => {
    try {
      const contractType = await ContractType.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      if (!contractType) {
        return res.status(404).send({ message: "Contract type not found" });
      }
      res.status(200).send({
        message: "Contract type updated successfully",
        data: contractType,
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed to update contract type",
        error: error.message,
      });
    }
  };

  deleteContractType = async (req, res) => {
    try {
      const contractType = await ContractType.findByIdAndDelete(req.params.id);
      if (!contractType) {
        return res.status(404).send({
          message: "Contract type not found",
        });
      }
      res.status(200).send({
        message: "Contract type deleted successfully",
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed to delete contract type",
        error: error.message,
      });
    }
  };
}

module.exports = new ContractTypeController();
