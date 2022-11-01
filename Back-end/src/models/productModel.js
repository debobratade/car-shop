const mongoose = require("mongoose");

const wonerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    price: {
      type: String,
    },
    category: {
      type: String,
    },
    userId: {
      type: String,
    },
    company: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", wonerSchema);
