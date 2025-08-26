const mongoose = require("mongoose");

const CompanyDataSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CompanyData", CompanyDataSchema);
