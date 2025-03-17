"use client";
import { columns } from "./columns";
import { ICourseCategoryT } from "@/types/tables";
import { DataTable } from "./data-table";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function CourseCategoryTableContent() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/items/course-categories/`;

  const fetchCategories = async (): Promise<ICourseCategoryT[]> => {
    try {
      const response = await axios.get(url);
      return response.data.categories;
    } catch (error) {
      toast(`${error}`);
      throw new Error("Failed to fetch categories");
    }
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["courseCategories"],
    queryFn: fetchCategories,
    staleTime: 300000,
  });

  if (isError) {
    return (
      <div className="text-red-500 text-center">Error: {error.message}</div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      {isLoading ? (
        <p className="text-center text-white">Loading categories...</p>
      ) : (
        <DataTable columns={columns} data={data || []} refreshData={refetch} />
      )}
    </div>
  );
}
