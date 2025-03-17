import mongoose, { Schema, model } from "mongoose";
import { ICourseSession } from "@/types/model";

const courseSessionSchema = new Schema<ICourseSession>(
  {
    course_id: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    teacher_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    max_capacity: { type: Number, required: true },
    current_enrollment: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["open", "closed", "ongoing", "completed", "cancelled"],
      default: "open",
    },
  },
  { timestamps: true }
);

const CourseSessionModel =
  mongoose.models.CourseSession ||
  model<ICourseSession>("CourseSession", courseSessionSchema);

export default CourseSessionModel;
