const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    transactionId: { type: String }, // Mã giao dịch từ VNPAY/Stripe
    paymentStatus: { type: String }, // success, failed, pending
    amount: { type: Number, required: true },
    paymentDetails: { type: Object }, // Lưu toàn bộ phản hồi từ Gateway
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
