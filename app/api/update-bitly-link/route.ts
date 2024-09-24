// /pages/api/update-bitly-link.ts
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/lib/model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { emailOrOrderId, bitlyLink } = body;

  if (!emailOrOrderId || !bitlyLink) {
    return NextResponse.json(
      { error: "Email/Order ID and Bitly link are required" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const user = await User.findOneAndUpdate(
      { $or: [{ email: emailOrOrderId }, { orderId: emailOrOrderId }] },
      { link: bitlyLink },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Bitly link updated successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
