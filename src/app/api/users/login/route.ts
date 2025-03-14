import dbConnect from "@/lib/dbConnect";
import UserModel from "@/lib/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwtSecret: string = process.env.NEXT_PUBLIC_JWT_SECRET || "";

export async function POST(request: Response) {
  await dbConnect();

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.userRole },
      jwtSecret,
      { expiresIn: "1h", algorithm: "HS256" }
    );

    return new Response(
      JSON.stringify({
        success: true,
        token,
        user: { email: user.email, role: user.userRole },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
