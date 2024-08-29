const express = require("express");
const contractRouter = express.Router();
const ContractController = require("../controllers/contract.controllers.js");

contractRouter
  .post("/add", ContractController.createContract)
  .get("/contracts", ContractController.getAllContracts)
  .get("/:id", ContractController.getContractById)
  .put("/update/:id", ContractController.updateContract)
  .delete("/delete/:id", ContractController.deleteContract);

module.exports = contractRouter;
