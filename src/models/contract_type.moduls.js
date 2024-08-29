const mongoose = require("mongoose");

const contractTypeSchema = new mongoose.Schema({
  duration: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
});

const ContractType = mongoose.model("ContractType", contractTypeSchema);

module.exports = ContractType;
