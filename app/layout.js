import localFont from "next/font/local";
import "./globals.css";

import { LandTitleRegistryProvider } from "/context/LandTitleRegistry";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Land Title Tokenization DApp",
  description: "A decentralized platform for land title tokenization.",
};

// RootLayout component
export default function RootLayout({ children }) {
  return (
    <LandTitleRegistryProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-colors`}
        >
          {children}
        </body>
      </html>
    </LandTitleRegistryProvider>
  );
}
