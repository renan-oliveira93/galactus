import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.scss";
import styles from "../styles/index.module.scss";
import Sidebar from "@/components/SideBar";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Screen Time Manager",
  description: "A simple app to manage your screen time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header className={styles.header}>
          <Sidebar />
          <Link href={{pathname:"/"}}>
              <h1>My Screen Time Manager 😀</h1>
          </Link>
        </header>
        <main className={styles.main}>
          {children}
        </main>
      </body>
    </html>
  );
}
