import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const result = await res.json();

  if (!res.ok) {
    return NextResponse.json({ message: "Login gagal" }, { status: 401 });
  }

  const response = NextResponse.json({ message: "Berhasil login" });

  response.cookies.set("token", result.token, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}

