import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ohayo",
  description: "Ohayo Pakistan Japan Training Center is a premier institution dedicated to fostering cultural exchange and providing high-quality education in Japanese language and culture. Our mission is to empower individuals with the skills and knowledge needed to thrive in a globalized world, while promoting mutual understanding between Pakistan and Japan.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/logo.svg" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}