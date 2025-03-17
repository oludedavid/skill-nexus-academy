"use client";

import axios from "axios";
import { ICourseCategoryT } from "@/types/tables";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormWrapper from "@/ui/formWrapper";
import EditCategoryForm from "@/ui/editForm";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const deleteRow = async (id: string, refreshData?: () => void) => {
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/items/course-categories/actions/delete?id=${id}`
    );
    toast.success("Course Category Deleted Successfully");
    refreshData?.();
  } catch (error) {
    toast.error("Failed to delete category");
    console.error(error);
  }
};

const viewRow = async (id: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/items/course-categories/actions/read?id=${id}`
    );

    const category = response.data;
    toast.success("Course Category Viewed Successfully");
  } catch (error) {
    toast.error("Failed to fetch category");
    console.error(error);
  }
};

const editRow = async (
  id: string,
  values: { name: string; description?: string }
) => {
  console.log("editRow function called with:", id, values);

  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/items/course-categories/actions/edit?id=${id}`,
      values
    );

    if (response.data) {
      toast.success("Category updated successfully");
    }
    return response.data;
  } catch (error) {
    toast.error("Failed to update category");
    throw error;
  }
};

export const columns: ColumnDef<ICourseCategoryT>[] = [
  {
    accessorKey: "name",
    header: () => <span className="font-medium">Category Name</span>,
    cell: ({ row }) => {
      const name: string = row.getValue("name");
      return <span className="font-medium">{name}</span>;
    },
  },
  {
    accessorKey: "description",
    header: () => <span className="font-medium">Description</span>,
    cell: ({ row }) => {
      const description: string = row.getValue("description");

      const truncated =
        description.length > 30
          ? `${description.substring(0, 30)}...`
          : description;

      return (
        <span
          className="text-sm text-gray-400 dark:text-gray-300"
          title={description}
        >
          {truncated}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <span className="font-medium">Created At</span>,
    cell: ({ row }) => {
      const createdAt: Date = row.getValue("createdAt");
      const dateObj = new Date(createdAt);
      const isRecent =
        (Date.now() - dateObj.getTime()) / (1000 * 60 * 60 * 24) < 7;

      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(dateObj);

      return (
        <span
          className={`text-sm ${
            isRecent
              ? "text-blue-600 dark:text-blue-400 font-medium"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          {formattedDate}
        </span>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <span className="font-medium">Updated At</span>,
    cell: ({ row }) => {
      const updatedAt: Date = row.getValue("updatedAt");
      const dateObj = new Date(updatedAt);
      const isRecent =
        (Date.now() - dateObj.getTime()) / (1000 * 60 * 60 * 24) < 7;

      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(dateObj);

      return (
        <span
          className={`text-sm ${
            isRecent
              ? "text-purple-600 dark:text-blue-400 font-medium"
              : "text-gray-400 dark:text-gray-400"
          }`}
        >
          {formattedDate}
        </span>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => <span className="font-medium">Actions</span>,
    id: "actions",
    cell: ({ row, table }) => {
      const courseCategory = row.original;
      const refreshData = table.options.meta?.refreshData;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-gray-400 hover:bg-purple-700 hover:text-white transition duration-200"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-[#151F30] text-white border border-gray-700 shadow-lg"
          >
            <DropdownMenuLabel className="text-purple-400">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem
              className="hover:bg-purple-700 transition duration-200"
              onClick={() => navigator.clipboard.writeText(courseCategory.name)}
            >
              Copy Course Category Name
            </DropdownMenuItem>
            <DropdownMenuSeparator className="border-gray-600" />
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
              }}
              className="hover:bg-purple-700 transition duration-200"
            >
              <FormWrapper title="Edit Category" description="">
                <EditCategoryForm
                  initialCategoryData={{
                    _id: courseCategory._id,
                    name: courseCategory.name,
                    description: courseCategory.description,
                  }}
                  onEdit={editRow}
                  refreshData={refreshData}
                />
              </FormWrapper>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:bg-purple-700 transition duration-200"
              onClick={() => deleteRow(courseCategory._id, refreshData)}
            >
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:bg-purple-700 transition duration-200"
              onClick={() => viewRow(courseCategory._id)}
            >
              View Category
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
