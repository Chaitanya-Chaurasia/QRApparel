// /pages/api/generate-qrcode.ts
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/lib/model";
import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { emailOrOrderId } = body;

  if (!emailOrOrderId) {
    return NextResponse.json(
      { error: "Email/Order ID is required" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    // Find user by email or order ID
    const user = await User.findOne({
      $or: [{ email: emailOrOrderId }, { orderId: emailOrOrderId }],
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { link } = user;

    // Ensure link exists (highly unlikely)
    if (!link) {
      return NextResponse.json(
        { error: "Link not found for this user" },
        { status: 404 }
      );
    }

    const qrCode = await QRCode.toDataURL(link);
    user.qrCode = qrCode;
    await user.save();

    return NextResponse.json({ qrCode }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
