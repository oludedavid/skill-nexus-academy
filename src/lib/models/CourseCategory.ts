import mongoose, { Schema, model } from "mongoose";
import { ICourseCategory } from "@/types/model";

const courseCategorySchema = new Schema<ICourseCategory>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

const CourseCategoryModel =
  mongoose.models.CourseCategory ||
  model<ICourseCategory>("CourseCategory", courseCategorySchema);

export default CourseCategoryModel;
