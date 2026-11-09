import type { Metadata } from "next";
import { Inter, Roboto_Condensed } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const robotoCondensed = Roboto_Condensed({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Toolia · Soutenance",
  description: "Présentation académique du projet Toolia, plateforme e-commerce B2C dédiée à l’outillage professionnel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${robotoCondensed.variable} antialiased min-h-screen font-sans`}>
        {children}
      </body>
    </html>
  );
}
