import type { Metadata } from "next";
import { Roboto, Cormorant_Garamond, Caveat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-cursive",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Dairy Cool Farm - Pure Bilona A2 Ghee",
  description: "Traditional Cow Bilona Ghee handcrafted by Dadi Kamlesh Gurjari",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", roboto.variable, cormorant.variable, caveat.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
