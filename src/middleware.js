import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const { isAuthenticated } = await getKindeServerSession();

  if (!isAuthenticated) {
    return NextResponse.redirect(
      new URL("/api/auth/login?post_login_redirect_url=/dashboard", request.url)
    );
  }
}

export const config = {
  matcher: ["/about/:path*", "/dashboard/:path*"], // Adjust paths as needed
};
