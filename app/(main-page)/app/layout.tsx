"use client";

import type { ReactNode } from "react";
import AppNavbar from "@/components/layout/AppNavbar";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <AppNavbar />
      <main
        id="main-content"
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 pt-20">
        {children}
      </main>
    </div>
  );
}
