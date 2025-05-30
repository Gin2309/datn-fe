import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const inter = Be_Vietnam_Pro({ subsets: ["vietnamese"], weight: "400" });

export const metadata: Metadata = {
  title: "VA Media",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="website icon" type="png" href="/favicon.png" />
      </head>
      <body className={`${inter.className}`}>
        <div className="overflow-hidden">{children}</div>
      </body>
    </html>
  );
}
