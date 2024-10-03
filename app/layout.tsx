import StarsCanvas from "@/components/StarBackground";
import ActiveSectionContextProvider from "@/context/active-section-context";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
const spaceGrotesk = Space_Grotesk({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
export const metadata: Metadata = {
  title: "Mohammed Sadok",
  description: "This is my portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} antialiased bg-[#030014] overflow-y-scroll overflow-x-hidden`}
      >
        <ActiveSectionContextProvider>
          <StarsCanvas />
          {children}
        </ActiveSectionContextProvider>
      </body>
    </html>
  );
}
