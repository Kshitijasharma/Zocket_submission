import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const users: any[] = [];

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Check if user exists
    if (users.some((u) => u.username === username)) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ id: users.length + 1, username, password: hashedPassword });

    return NextResponse.json({ message: "User registered successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error registering user" }, { status: 500 });
  }
}