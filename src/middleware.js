import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    // Ensure the origin and pathname are correctly formed
    const url = new URL(request.url);
    const origin = url.origin;
    const loginUrl = new URL("/api/auth/login", origin);
    loginUrl.searchParams.set("post_login_redirect_url", `${origin}/dashboard`);

    return NextResponse.redirect(loginUrl.toString());
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*"],
};
