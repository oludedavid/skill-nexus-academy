import dbConnect from "@/lib/dbConnect";
import UserModel from "@/lib/models/User";

export async function GET() {
  await dbConnect();
  const users = await UserModel.find({});

  return new Response(JSON.stringify(users), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
