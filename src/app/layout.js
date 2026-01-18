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
  title: "Pneubevax - Indian Pneumococcal League",
  description:
    "Indian Pneumococcal League - Join the fight against pneumococcal disease with Pneubevax",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/homepage/bg_homepage.png" as="image" />
        <link rel="preload" href="/homepage/bg_homepage_pc.png" as="image" />
        <link rel="preload" href="/homepage/SUB1.png" as="image" />
        <link rel="preload" href="/homepage/sub2.png" as="image" />
        <link
          rel="preload"
          href="/formcollection/bg_formcollection.png"
          as="image"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
