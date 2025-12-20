import mongoose from "mongoose";
const sizeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ["shoe", "clothes", "none"],
      required: true,
    },

    value: {
      type: Number,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Size = mongoose.model("Size", sizeSchema);
export default Size;
