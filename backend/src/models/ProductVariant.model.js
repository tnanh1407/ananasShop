import mongoose from "mongoose";
const productsVariantSchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    sizeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Size",
      default: null,
    },

    colorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
      default: null,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true }
);
const ProductVariant = mongoose.model("ProductVariant", productsVariantSchema);
export default ProductVariant;
