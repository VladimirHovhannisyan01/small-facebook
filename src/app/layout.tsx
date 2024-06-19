import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { AuthProvider } from "@/AuthContext";
import { UserProfileProvider } from "@/UserProfileContext.tsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "small facebook",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <UserProfileProvider>{children}</UserProfileProvider>
        </AuthProvider>
      </body>
    </html>
  );
}