// import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/lib/model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { emailOrOrderId, newLink } = body;

  if (!emailOrOrderId || !newLink) {
    return NextResponse.json(
      { error: "Email/Order ID and new link are required" },
      { status: 400 }
    );
  }

  try {
    // await dbConnect();
    //
    const user = await User.findOne({
      $or: [{ email: emailOrOrderId }, { orderId: emailOrOrderId }],
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update the link
    user.link = newLink;
    await user.save();

    return NextResponse.json(
      { message: "Link updated successfully" },
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
