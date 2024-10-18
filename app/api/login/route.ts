import dbConnect from "../../../lib/dbConnect";
import User from "../../../lib/model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ message: "Method not allowed" });
  }

  const body = await req.json();
  const { emailOrOrderId } = body;

  if (!emailOrOrderId) {
    return NextResponse.json({ message: "Email or Order ID is required" });
  }

  await dbConnect();

  // Check if the user exists by email or orderId
  const user =
    (await User.findOne({ email: emailOrOrderId })) ||
    (await User.findOne({ orderId: emailOrOrderId }));

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Create session or any custom login logic (for now just returning a success message)
  // In a real-world scenario, you would handle authentication tokens, sessions, or cookies.

  return NextResponse.json(
    {
      message: "Login successful",
      user: { email: user.email, orderId: user.orderId },
    },
    { status: 200 }
  );
}
