import { getAuthSession } from "@/app/actions";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/lib/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const session = await getAuthSession();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized access." },
        { status: 403 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const roleQuery = searchParams.get("role");
    const isTeacherApproved = searchParams.get("is_approved");

    const query: any = {};

    if (roleQuery) {
      query.role = roleQuery;
    }

    if (isTeacherApproved !== null) {
      query.is_approved = isTeacherApproved === "true";
    }

    const users = await UserModel.find(query);

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
