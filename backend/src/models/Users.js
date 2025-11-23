import mongoose from "mongoose";
const usersSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },

    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      minlength: 3,
      maxlength: 50,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    phoneNumber: {
      type: String,
      trim: true,
      sparse: true,
      // cho phép null nhưng không được trùng
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", usersSchema);
export default User;
