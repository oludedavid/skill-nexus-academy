import { RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    refreshData?: () => void;
  }
}
export interface ICourseCategoryT {
  _id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  refreshData?: () => void;
}

export interface ICourseT {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ICourseSessionT {
  _id: string;
  course_id: string;
  teacher_id: string;
  start_date: Date;
  end_date: Date;
  max_capacity: number;
  current_enrollment: number;
  status: "open" | "closed" | "ongoing" | "completed" | "cancelled";
  created_at: Date;
  updated_at: Date;
}
