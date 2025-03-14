import mongoose, { Schema, model } from "mongoose";
import { IUser } from "@/types/model";

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userRole: {
      type: String,
      enum: ["student", "teacher", "admin"],
      required: true,
    },
    is_approved: {
      type: Boolean,
      required: function (this: IUser) {
        return this.userRole === "teacher";
      },
      default: false,
    },
    is_email_verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || model<IUser>("User", userSchema);

export default UserModel;
