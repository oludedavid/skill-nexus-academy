import { NextResponse } from "next/server";
import { getAuthSession } from "@/app/actions";
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

    const { name, description } = await req.json();

    if (!name || name.trim().length < 3) {
      return NextResponse.json(
        { error: "Category name must be at least 3 characters long." },
        { status: 400 }
      );
    }

    const existingCategory = await CourseCategoryModel.findOne({ name });
    if (existingCategory) {
      return NextResponse.json(
        { error: "Category already exists." },
        { status: 400 }
      );
    }

    const newCategory = new CourseCategoryModel({ name, description });
    await newCategory.save();

    return NextResponse.json(
      { message: "Category created successfully!", category: newCategory },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating category:", error);
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

    const categories = await CourseCategoryModel.find().sort({ name: 1 });

    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
