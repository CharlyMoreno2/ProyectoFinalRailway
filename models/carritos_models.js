const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  productos: [
    {
      type: Object,
      ref: "productos",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const CarritosModel = mongoose.model("carritos", Schema);
module.exports = CarritosModel;
