import { NextResponse } from "next/server";
import { getAuthSession } from "@/app/actions";
import CourseModel from "@/lib/models/Course";
import CourseSessionModel from "@/lib/models/CourseSessions";
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

    const { course_id, teacher_id, start_date, end_date, max_capacity } =
      await req.json();

    if (
      !course_id ||
      !teacher_id ||
      !start_date ||
      !end_date ||
      !max_capacity
    ) {
      return NextResponse.json(
        {
          error:
            "All fields (course_id, teacher_id, start_date, end_date, max_capacity) are required.",
        },
        { status: 400 }
      );
    }

    const existingCourse = await CourseModel.findById(course_id);
    if (!existingCourse) {
      return NextResponse.json(
        { error: "Invalid course_id. Course does not exist." },
        { status: 400 }
      );
    }
    const overlappingSession = await CourseSessionModel.findOne({
      course_id,
      $or: [{ start_date: { $lt: end_date }, end_date: { $gt: start_date } }],
    });

    if (overlappingSession) {
      return NextResponse.json(
        {
          error:
            "A session for this course already exists within the given timeframe.",
        },
        { status: 400 }
      );
    }

    const newSession = new CourseSessionModel({
      course_id,
      teacher_id,
      start_date,
      end_date,
      max_capacity,
      current_enrollment: 0,
      status: "open",
    });

    await newSession.save();

    return NextResponse.json(
      { message: "Course session created successfully!", session: newSession },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating course session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const courseSessions = await CourseSessionModel.find()
      .populate("course_id")
      .populate("teacher_id");

    return NextResponse.json({ courseSessions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching course sessions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
