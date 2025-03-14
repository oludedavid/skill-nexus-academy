import dbConnect from "@/lib/dbConnect";
import UserModel from "@/lib/models/User";
import { ROLES } from "@/lib/constanst";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { fullName, email, password, userRole } = await request.json();

    if (!fullName || !email || !password || !userRole) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!ROLES.includes(userRole)) {
      return new Response(
        JSON.stringify({ error: "Invalid user role provided" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "Email already in use" }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      fullName,
      email,
      password: hashedPassword,
      userRole,
    });

    return new Response(
      JSON.stringify({ success: true, user: { fullName, email, userRole } }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify({ error: "Failed to create user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
