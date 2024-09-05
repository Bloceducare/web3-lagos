"use client"
import type { Metadata } from "next";
import Header from '../../components/livestream/Header'

import Image from "next/image";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex flex-col items-center overflow-hidden">
      <Header />
      {children}
    </div>
  );
}
