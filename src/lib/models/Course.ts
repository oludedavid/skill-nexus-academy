import mongoose, { Schema, model } from "mongoose";
import { ICourse } from "@/types/model";

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "CourseCategory",
      required: true,
    },
    price: { type: Number, required: true },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const CourseModel =
  mongoose.models.Course || model<ICourse>("Course", courseSchema);

export default CourseModel;
