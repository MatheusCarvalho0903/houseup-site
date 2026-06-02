import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HouseUp Construtora | Construção por Administração em Uberlândia-MG",
  description:
    "Construa sua casa com total transparência. Financiamento Caixa, gestão por administração e projetos completos — do arquitetônico à aprovação municipal. Uberlândia, MG.",
  keywords: [
    "construtora Uberlândia",
    "construção por administração",
    "financiamento Caixa construção",
    "casa sob medida",
    "HouseUp",
  ],
  authors: [{ name: "HouseUp Construtora" }],
  openGraph: {
    title: "HouseUp Construtora | Sua casa do jeito que você imaginou",
    description:
      "Construção transparente, com você em cada etapa. Do projeto à entrega, tudo com a HouseUp.",
    locale: "pt_BR",
    type: "website",
    siteName: "HouseUp Construtora",
  },
  twitter: {
    card: "summary_large_image",
    title: "HouseUp Construtora",
    description: "Construção transparente em Uberlândia, MG.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="min-h-full antialiased">
        <Navbar />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
