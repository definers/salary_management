import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers"; // <--- Import the Providers component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Salary Management",
  description: "HR Salary Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* suppressHydrationWarning prevents errors caused by browser extensions injecting attributes */}
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}