import { NextResponse, NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const cookie = request.cookies.get("token")?.value;

  if (!cookie) {
    const dashboardUrl = new URL("/login", request.url);
    dashboardUrl.searchParams.set("error", "Tidak ada token");
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};

