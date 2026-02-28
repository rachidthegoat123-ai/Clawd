import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Alpha Mirror — Pump.fun Tracker",
  description:
    "Mirror the best pump.fun snipers on Solana. Intelligent copy-trading with rug protection and safety filters.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-[260px] transition-all duration-300">
            <div className="max-w-[1400px] mx-auto p-6 lg:p-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
