import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db";
import Bank from "@/lib/models/Bank";

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  await Bank.create(body);

  return NextResponse.json({ success: true });
}
