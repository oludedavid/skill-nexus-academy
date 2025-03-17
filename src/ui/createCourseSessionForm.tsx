"use client";
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const courseSessionSchema = z
  .object({
    course_id: z.string().min(1, "Please select a course"),
    teacher_id: z.string().min(1, "Please select a teacher"),
    start_date: z.date({
      required_error: "Start date is required",
    }),
    end_date: z.date({
      required_error: "End date is required",
    }),
    max_capacity: z.coerce
      .number()
      .min(1, "Capacity must be at least 1")
      .max(100, "Maximum capacity is 100"),
  })
  .refine((data) => data.end_date > data.start_date, {
    message: "End date must be after start date",
    path: ["end_date"],
  });

export default function CourseSessionForm() {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<{ _id: string; title: string }[]>([]);
  const [teachers, setTeachers] = useState<{ _id: string; fullName: string }[]>(
    []
  );

  const form = useForm<z.infer<typeof courseSessionSchema>>({
    resolver: zodResolver(courseSessionSchema),
    defaultValues: {
      course_id: "",
      teacher_id: "",
      max_capacity: 20,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, teachersRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items/course/`),
          axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/users/teachers?role=teacher&is_approved=true`
          ),
        ]);
        console.log("Teacher response:", teachersRes.data);
        setCourses(coursesRes.data.courses);
        setTeachers(teachersRes.data);
      } catch (error) {
        toast("Failed to load required data");
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (values: z.infer<typeof courseSessionSchema>) => {
    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/items/course-sessions/`,
        {
          ...values,
          start_date: values.start_date.toISOString(),
          end_date: values.end_date.toISOString(),
        }
      );
      toast("Course session created successfully");
      form.reset();
    } catch (error) {
      toast("Failed to create course session");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-[#1A2434] text-white w-full max-w-4xl mx-auto transition-all duration-300 hover:shadow-2xl">
      <CardHeader className="text-center space-y-1 pb-4 border-b border-gray-700">
        <CardTitle className="text-2xl font-bold text-[#DAD7E2] flex items-center justify-center">
          <CalendarIcon className="w-6 h-6 mr-2 text-[#663FD6]" />
          Add New Course Session
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6">
              {/* Course Selection - Full Width */}
              <FormField
                control={form.control}
                name="course_id"
                render={({ field }) => (
                  <FormItem className="transition-all duration-200 hover:border-[#663FD6] focus-within:border-[#663FD6] rounded-md p-1">
                    <FormLabel className="text-gray-300 font-medium">
                      Course
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-[#10192B] border-gray-700 text-white focus:ring-1 focus:ring-[#663FD6] h-11">
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#10192B] border-gray-700 text-white">
                        {courses.map((course) => (
                          <SelectItem
                            key={course._id}
                            value={course._id}
                            className="hover:bg-[#663FD6]/20 cursor-pointer"
                          >
                            {course.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Two Column Layout for Remaining Fields */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6 mt-2">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="teacher_id"
                    render={({ field }) => (
                      <FormItem className="transition-all duration-200 hover:border-[#663FD6] focus-within:border-[#663FD6] rounded-md p-1">
                        <FormLabel className="text-gray-300 font-medium">
                          Instructor
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-[#10192B] border-gray-700 text-white focus:ring-1 focus:ring-[#663FD6] h-11">
                              <SelectValue placeholder="Select instructor" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#10192B] border-gray-700 text-white max-h-60">
                            {teachers && teachers.length > 0 ? (
                              teachers.map((teacher) => (
                                <SelectItem
                                  key={teacher._id}
                                  value={teacher._id}
                                  className="hover:bg-[#663FD6]/20 cursor-pointer"
                                >
                                  {teacher.fullName}
                                </SelectItem>
                              ))
                            ) : (
                              <div className="px-2 py-4 text-center text-gray-400">
                                No instructors available
                              </div>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="max_capacity"
                    render={({ field }) => (
                      <FormItem className="transition-all duration-200 hover:border-[#663FD6] focus-within:border-[#663FD6] rounded-md p-1">
                        <FormLabel className="text-gray-300 font-medium">
                          Capacity
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="number"
                              min={1}
                              max={100}
                              {...field}
                              className="bg-[#10192B] border-gray-700 text-white focus:ring-1 focus:ring-[#663FD6] h-11 pl-3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                              students
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="start_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col transition-all duration-200 hover:border-[#663FD6] focus-within:border-[#663FD6] rounded-md p-1">
                        <FormLabel className="text-gray-300 font-medium">
                          Start Date
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal bg-[#10192B] border-gray-700 text-white hover:bg-[#1A2434] focus:ring-1 focus:ring-[#663FD6] h-11",
                                  !field.value && "text-gray-400"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0 bg-[#10192B] border-gray-700 text-white"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className="text-white"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="end_date"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col transition-all duration-200 hover:border-[#663FD6] focus-within:border-[#663FD6] rounded-md p-1">
                        <FormLabel className="text-gray-300 font-medium">
                          End Date
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal bg-[#10192B] border-gray-700 text-white hover:bg-[#1A2434] focus:ring-1 focus:ring-[#663FD6] h-11",
                                  !field.value && "text-gray-400"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-full p-0 bg-[#10192B] border-gray-700 text-white"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date <
                                (form.getValues("start_date") || new Date())
                              }
                              initialFocus
                              className="text-white"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 mt-6">
              <Button
                type="submit"
                className="w-full bg-[#663FD6]"
                disabled={loading}
              >
                {loading && <Loader2 className="h-5 w-5 animate-spin mr-2" />}
                {loading ? "Creating Session..." : "Create Course Session"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
