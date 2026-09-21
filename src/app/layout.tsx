import type { Metadata } from "next";
import "./globals.css";
import { GlobalProvider } from "@/components/GlobalProvider";

export const metadata: Metadata = {
  title: "Le Vert Angkor Hotel | Luxury Boutique Hotel in Siem Reap",
  description: "Luxury boutique hotel in Siem Reap, Cambodia, featuring rooftop pool, spa, dining, and curated Angkor temple tours.",
  icons: {
    icon: "https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/01/cropped-cropped-1logo-60x60.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#FAF8F5] text-[#1E2522] antialiased selection:bg-[#2A4436] selection:text-[#FAF8F5]">
        <GlobalProvider>
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
