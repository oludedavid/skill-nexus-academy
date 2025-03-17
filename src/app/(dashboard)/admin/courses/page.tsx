"use client";
import React from "react";
import CourseSessionForm from "@/ui/createCourseSessionForm";
import CourseForm from "@/ui/createCourseForm";
import CategoryForm from "@/ui/createCategoryForm";
import FormWrapper from "@/ui/formWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formData = [
  {
    key: "courseCategory",
    title: "Category",
    description: "Create a new course category",
    component: <CategoryForm />,
  },
  {
    key: "courseItem",
    title: "Course",
    description: "Create a new course",
    component: <CourseForm />,
  },
  {
    key: "courseSession",
    title: "Course Session",
    description: "Create a new course session",
    component: <CourseSessionForm />,
  },
];

export default function AdminCourseSessions() {
  return (
    <div className="w-full px-4 py-4 space-y-12 max-w-7xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-[#DAD7E2] tracking-tight mb-4">
          Manage Courses
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {formData.map((form) => (
            <FormWrapper
              key={form.key}
              title={form.title}
              description={form.description}
            >
              {form.component}
            </FormWrapper>
          ))}
        </div>
      </div>

      <div className="bg-[#1A2434] rounded-xl shadow-xl border border-[#2A3546]">
        <Tabs defaultValue="categories" className="w-full">
          <TabsList className="w-full flex justify-start gap-4 bg-[#10192B] text-white p-3 border-b border-[#2A3546] rounded-t-xl">
            <TabsTrigger
              value="categories"
              className="px-5 py-2 rounded-md data-[state=active]:bg-[#663FD6] data-[state=active]:text-white transition-all duration-300 hover:bg-[#663FD6]/30"
            >
              Categories
            </TabsTrigger>
            <TabsTrigger
              value="courses"
              className="px-5 py-2 rounded-md data-[state=active]:bg-[#663FD6] data-[state=active]:text-white transition-all duration-300 hover:bg-[#663FD6]/30"
            >
              Courses
            </TabsTrigger>
            <TabsTrigger
              value="courseSession"
              className="px-5 py-2 rounded-md data-[state=active]:bg-[#663FD6] data-[state=active]:text-white transition-all duration-300 hover:bg-[#663FD6]/30"
            >
              Course Sessions
            </TabsTrigger>
          </TabsList>

          <div className="p-6">
            <TabsContent value="categories" className="mt-0">
              <div className="bg-[#10192B] p-6 rounded-lg border border-[#1A2434]">
                {/* Add category management content */}
              </div>
            </TabsContent>
            <TabsContent value="courses" className="mt-0">
              <div className="bg-[#10192B] p-6 rounded-lg border border-[#1A2434]">
                {/* Add course management content */}
              </div>
            </TabsContent>
            <TabsContent value="courseSession" className="mt-0">
              <div className="bg-[#10192B] p-6 rounded-lg border border-[#1A2434]">
                {/* Add session management content */}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
