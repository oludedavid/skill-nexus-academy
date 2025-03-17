"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
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

export default function CategoryForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "", description: "" },
  });

  async function onSubmit(values: z.infer<typeof categorySchema>) {
    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/items/course-categories/`,
        values
      );
      toast("Category added successfully!");
      form.reset();
    } catch (error) {
      console.error("Error creating category:", error);
      toast("Error creating category");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full border-0 shadow-lg bg-[#1A2434] text-white  grid grid-cols-1">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold text-[#DAD7E2]">
          Add New Category
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
              {loading ? "Adding Category..." : "Add Category"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
