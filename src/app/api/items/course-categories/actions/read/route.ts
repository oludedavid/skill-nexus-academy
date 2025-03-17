import { NextResponse, NextRequest } from "next/server";
import { getAuthSession } from "@/app/actions";
import CourseCategoryModel from "@/lib/models/CourseCategory";
import dbConnect from "@/lib/dbConnect";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getAuthSession();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized access." },
        { status: 403 }
      );
    }

    const searchParams = req.nextUrl.searchParams;
    const queryId = searchParams.get("id");

    if (!queryId) {
      return NextResponse.json(
        { error: "Missing ID parameter" },
        { status: 400 }
      );
    }
    const category = await CourseCategoryModel.findById(queryId);
    if (!category) {
      return NextResponse.json(
        { error: "Course category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ category }, { status: 200 });
  } catch (error) {
    console.error("Error fetching course category:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
