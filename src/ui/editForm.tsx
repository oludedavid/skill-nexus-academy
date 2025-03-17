"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import isEqual from "lodash.isequal";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const categorySchema = z.object({
  name: z.string().min(3, "Category name must be at least 3 characters."),
  description: z.string().optional(),
});

interface EditCategoryFormProps {
  initialCategoryData: { _id: string; name: string; description?: string };
  onEdit: (
    id: string,
    values: { name: string; description?: string }
  ) => Promise<void>;
  refreshData?: () => void;
}

export default function EditCategoryForm({
  initialCategoryData,
  onEdit,
  refreshData,
}: EditCategoryFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialCategoryData.name,
      description: initialCategoryData.description || "",
    },
  });

  async function onSubmit(values: z.infer<typeof categorySchema>) {
    setLoading(true);

    if (
      isEqual(values, {
        name: initialCategoryData.name,
        description: initialCategoryData.description || "",
      })
    ) {
      toast("No changes detected.");
      setLoading(false);
      return;
    }

    try {
      await onEdit(initialCategoryData._id, values);
      refreshData?.();
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full border-0 shadow-lg bg-[#1A2434] text-white grid grid-cols-1">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold text-[#DAD7E2]">
          Edit Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Category Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Web Development"
                      {...field}
                      className="bg-[#10192B] border-gray-700 text-white"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(Optional) Brief description of category"
                      {...field}
                      className="bg-[#10192B] border-gray-700 text-white"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-[#663FD6] hover:bg-[#552EC4] text-white font-semibold py-2 transition-all"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Category"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
