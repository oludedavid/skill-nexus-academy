"use client";

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const courseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  category: z.string().nonempty("Please select a category."),
  price: z.coerce.number().min(1, "Price must be greater than 0."),
});

export default function CourseForm() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  );

  const form = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: { title: "", description: "", category: "", price: 0 },
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/items/course-categories/`
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast("Error fetching categories");
      }
    }
    fetchCategories();
  }, []);

  async function onSubmit(values: z.infer<typeof courseSchema>) {
    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/items/course/`,
        values
      );
      toast("Course added successfully!");
      form.reset();
    } catch (error) {
      console.error("Error creating course:", error);
      toast("Error creating course!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-0 shadow-lg bg-[#1A2434] text-white w-full grid grid-cols-1">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold text-[#DAD7E2]">
          Add New Course
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Course Title"
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
                      placeholder="Course Description"
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-[#10192B] border-gray-700 text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#10192B] border-gray-700 text-white">
                      {categories.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Price (€)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Course Price"
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
              {loading ? "Adding Course..." : "Add Course"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
