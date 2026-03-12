import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === "/acesso";
  const isAdminRoute = request.nextUrl.pathname.startsWith("/acesso/");

  // Check for Supabase auth cookie (sb-*-auth-token)
  const hasAuthCookie = request.cookies
    .getAll()
    .some((c) => c.name.includes("-auth-token"));

  // Not logged in, trying to access admin pages → redirect to login
  if (!hasAuthCookie && isAdminRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/acesso";
    return NextResponse.redirect(url);
  }

  // Logged in, on login page → redirect to dashboard
  if (hasAuthCookie && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/acesso/painel";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/acesso", "/acesso/:path*"],
};
