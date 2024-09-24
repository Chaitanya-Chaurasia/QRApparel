import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";
import User from "@/app/lib/model";
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect(); // Try to establish a database connection
    const users = await User.find();
    console.log(users.map((user) => console.log(user)));
    return NextResponse.json("Successfully connected to database");
  } catch (error) {
    console.error("Database connection failed:", error);
    return NextResponse.json({ message: "Database connection failed" });
  }
}
