"use client";

// import { ModeToggle } from "@/common/ModeToggle";
import { useTheme } from "next-themes";
import { useEffect } from "react";

function Dashboard() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("dark");
  }, []);

  return <>{/* <ModeToggle /> */}</>;
}

export default Dashboard;
