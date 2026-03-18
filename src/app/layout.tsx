import type { Metadata } from "next";
import "./globals.css"; // This ensures your Tailwind/CSS works

export const metadata: Metadata = {
  title: "Environmental Statistics Dashboard",
  description: "Real-time air quality and health insights",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}