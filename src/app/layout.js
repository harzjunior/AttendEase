import { Inter } from "next/font/google";
import { ThemeProvider } from "@/common/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { AttendanceProvider } from "@/context/AttendanceContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AttendEase",
  description: "Generated AttendEase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* sonner for used in AddNewStudent. a confirmation of successful form submit */}
          <Toaster richColors />
          <AttendanceProvider>{children}</AttendanceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
