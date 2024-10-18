// /pages/api/register.ts
// import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/lib/model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" });
  }

  const body = await req.json();
  const { fullName, email, orderId } = body;

  // Validate the incoming data
  if (!fullName || !email || !orderId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 405 }
    );
  }

  try {
    // Connect to the database
    // await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { orderId }] });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email or order ID" },
        { status: 400 }
      );
    }

    // Create a new user
    const newUser = new User({
      name: fullName,
      email,
      orderId,
      qrCode: "",
      link: "",
    });

    // Save the user in the database
    await newUser.save();

    // Return success response
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
