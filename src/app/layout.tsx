import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { AgriProvider } from "@/context/AgriContext";
import { ChatProvider } from "@/context/ChatContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AgriTech Punjab | Data-Driven Agriculture Solutions",
  description: "Professional agriculture technology platform providing data-driven insights for farmers in Punjab. Access weather forecasts, crop recommendations, disease alerts, and irrigation planning.",
  keywords: ["agriculture", "Punjab", "farming", "crop management", "weather", "irrigation", "fertilizer", "agri-tech"],
  authors: [{ name: "AgriTech Punjab" }],
  openGraph: {
    title: "AgriTech Punjab | Data-Driven Agriculture",
    description: "Empowering farmers with data-driven agricultural insights",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased" suppressHydrationWarning>
        <AgriProvider>
          <ChatProvider>
            {children}
          </ChatProvider>
        </AgriProvider>
      </body>
    </html>
  );
}
