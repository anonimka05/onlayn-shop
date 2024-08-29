const express = require("express");
const contractTypeRouter = express.Router();
const ContractTypeController = require("../controllers/contractType.controller.js");

contractTypeRouter
  .post("/add", ContractTypeController.createContractType)
  .get("/", ContractTypeController.getAllContractTypes)
  .get("/:id", ContractTypeController.getContractTypeById)
  .put("/update/:id", ContractTypeController.updateContractType)
  .delete("/delete/:id", ContractTypeController.deleteContractType);

module.exports = contractTypeRouter;
