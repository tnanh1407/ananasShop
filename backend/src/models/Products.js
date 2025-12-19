import mongoose from "mongoose";
const productsShema = new mongoose.Schema({
  nameProduct: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
  priceProduct: {
    type: Number,
    required: true,
    min: 0,
  },

  statusProduct: {
    type: String,
    enum: ["limit", "online", "sale off", "none"],
    default: "none",
  },
  materialIds: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "material",
  },
});
