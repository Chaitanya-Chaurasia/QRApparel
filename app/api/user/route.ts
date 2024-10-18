// /pages/api/get-user.ts
// import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/lib/model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const emailOrOrderId = searchParams.get("emailOrOrderId");

  if (!emailOrOrderId) {
    return NextResponse.json(
      { error: "Email or Order ID is required" },
      { status: 400 }
    );
  }

  try {
    // await dbConnect();

    const user = await User.findOne({
      $or: [{ email: emailOrOrderId }, { orderId: emailOrOrderId }],
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { name, email, orderId, qrCode, link } = user;
    return NextResponse.json(
      { name, email, orderId, qrCode, link },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
