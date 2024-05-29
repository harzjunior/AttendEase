"use client";

import { useRouter } from "next/router";
// import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      router.push("/api/auth/login?post_login_redirect_url=/dashboard");
    }
  }, [router]);
  return <main className=""></main>;
}
