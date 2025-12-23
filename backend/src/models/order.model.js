import mongoose from "mongoose";
import { resolveVariantPrice } from "../helpers/pricing.helper";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        variant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductVariant",
          required: true,
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      phone: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "MOMO", "VNPAY"],
      default: "COD",
    },
    itemsPrice: { type: Number, default: 0 },
    shippingPrice: { type: Number, default: 0 },
    taxPrice: { type: Number, default: 0 },

    promotion: {
      promotionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Promotion",
      },
      code: String,
      discountType: {
        type: String,
        enum: ["percentage", "fixed"],
      },
      discountValue: Number,
      discountAmount: { type: Number, default: 0 }, //   tổng số tiền đã giảm
    },
    totalPrice: { type: Number, default: 0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

orderSchema.pre("save", function (next) {
  // 1️⃣ Tính tổng tiền hàng
  this.itemsPrice = this.orderItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // 2️⃣ Tính tiền giảm giá
  let discount = 0;

  if (this.promotion && this.promotion.discountType) {
    if (this.promotion.discountType === "percentage") {
      discount = (this.itemsPrice * this.promotion.discountValue) / 100;
    } else if (this.promotion.discountType === "fixed") {
      discount = this.promotion.discountValue;
    }
  }

  this.promotion.discountAmount = Math.min(discount, this.itemsPrice);

  // 3️⃣ Tổng tiền cuối
  this.totalPrice =
    this.itemsPrice +
    this.shippingPrice +
    this.taxPrice -
    this.promotion.discountAmount;

  next();
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
