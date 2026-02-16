import type { Metadata } from "next";
import { ReduxProvider } from "@/store/redux-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Snapp! Box",
  description: "Fast & reliable package delivery",
  themeColor: "#00b862",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="antialiased">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
