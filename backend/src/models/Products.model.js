import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    nameProduct: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      enum: ["shoe", "clothes", "accessory", "none"],
      required: true,
      default: "none",
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
    materialIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material",
      },
    ],

    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
    },
    //  Kiểu dáng
    design: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Design",
    },
    information: {
      desc: {
        type: String,
        default: null,
      },
      images: {
        type: String,
        default: null,
      },
    },
    gender: {
      type: String,
      enum: ["none", "male", "female"],
      default: "none",
    },
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
