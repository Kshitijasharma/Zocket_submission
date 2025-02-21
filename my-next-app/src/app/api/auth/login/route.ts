import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Simulated database (Replace with actual DB query)
const users = [
  { id: 1, username: "admin", password: bcrypt.hashSync("password", 10) }, // Hash password
];

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Find user
    const user = users.find((u) => u.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });

    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ message: "Error logging in" }, { status: 500 });
  }
}