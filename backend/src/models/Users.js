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
    },
    address: {
      type: String,
    },
    sex: {
      type: String,
      enum: ["male", "female", "other"],
      default: null,
    },
    nationality: {
      type: String,
      default: "Vietnam",
    },
    urlAvatar: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", usersSchema);
export default User;
