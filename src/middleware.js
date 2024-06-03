import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function middleware(request) {
  try {
    const { isAuthenticated } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      const url = new URL(request.url);
      const origin = url.origin;
      const loginUrl = new URL("/api/auth/login", origin);
      loginUrl.searchParams.set(
        "post_login_redirect_url",
        `${origin}/dashboard`
      );

      return NextResponse.redirect(loginUrl.toString());
    }
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
