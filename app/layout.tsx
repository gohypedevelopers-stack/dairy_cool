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
  title: "Dairy Cool Farm - Pure Bilona Ghee",
  description: "Dairy Cool Farm brings you 100% natural, farm-fresh bilona ghee and dairy products directly from our happy free-grazing buffaloes.",
  icons: {
    icon: [
      { url: "/logo.png" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

import { CartProvider } from "@/components/cart-provider";
import { AuthProvider } from "@/lib/auth-context";

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
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

