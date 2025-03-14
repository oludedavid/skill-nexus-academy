import { Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  userRole: "student" | "teacher" | "admin";
  is_approved?: boolean;
  is_email_verified?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
