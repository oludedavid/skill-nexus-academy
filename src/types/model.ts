import { Document } from "mongoose";
import { Schema } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role: "student" | "teacher" | "admin";
  is_approved?: boolean;
  is_email_verified?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface ICourse extends Document {
  title: string;
  description: string;
  category: Schema.Types.ObjectId;
  price: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ICourseCategory extends Document {
  name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICourseSession extends Document {
  course_id: Schema.Types.ObjectId;
  teacher_id: Schema.Types.ObjectId;
  start_date: Date;
  end_date: Date;
  max_capacity: number;
  current_enrollment: number;
  status: "open" | "closed" | "ongoing" | "completed" | "cancelled";
  created_at: Date;
  updated_at: Date;
}
