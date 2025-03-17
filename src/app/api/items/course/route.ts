import { NextResponse } from "next/server";
import { getAuthSession } from "@/app/actions";
import CourseModel from "@/lib/models/Course";
import CourseCategoryModel from "@/lib/models/CourseCategory";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const session = await getAuthSession();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized access." },
        { status: 403 }
      );
    }

    const { title, description, category, price } = await req.json();

    if (!title || !description || !category || !price) {
      return NextResponse.json(
        {
          error:
            "All fields (title, description, category, price) are required.",
        },
        { status: 400 }
      );
    }

    const existingCategory = await CourseCategoryModel.findById(category);
    if (!existingCategory) {
      return NextResponse.json(
        { error: "Invalid category. Please provide a valid category ID." },
        { status: 400 }
      );
    }

    const existingCourse = await CourseModel.findOne({ title });
    if (existingCourse) {
      return NextResponse.json(
        { error: "A course with this title already exists." },
        { status: 400 }
      );
    }

    const newCourse = new CourseModel({
      title,
      description,
      category,
      price,
      is_active: true,
    });

    await newCourse.save();

    return NextResponse.json(
      { message: "Course created successfully!", course: newCourse },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const session = await getAuthSession();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized access." },
        { status: 403 }
      );
    }
    const courses = await CourseModel.find().populate("category");

    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
