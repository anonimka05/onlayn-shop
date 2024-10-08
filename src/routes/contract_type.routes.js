const express = require("express");
const contractTypeRouter = express.Router();
const ContractTypeController = require("../controllers/contractType.controller.js");

contractTypeRouter
  .get("/", ContractTypeController.getAllContractTypes)
  .get("/:id", ContractTypeController.getContractTypeById)
  .post("/add", ContractTypeController.createContractType)
  .put("/update/:id", ContractTypeController.updateContractType)
  .delete("/delete/:id", ContractTypeController.deleteContractType);

module.exports = contractTypeRouter;
