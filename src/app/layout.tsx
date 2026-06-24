import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/shared/Layout";
import { NavProgressBar } from "@/components/shared/NavProgressBar";
import { UIProvider } from "@/context/UIContext";

const inter = Inter({ subsets: ["latin"] });

/**
 * Root Metadata for SEO and Browser Identification
 */
export const metadata: Metadata = {
  title: "AssamWRIS | Water Resources Information System",
  description: "Integrated real-time monitoring and GIS exploration platform for Assam's water resources.",
};

/**
 * Root Layout Component
 * 
 * This is the parent wrapper for all pages in the application.
 * It provides the persistent navigation and footer structure.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-white text-gray-900 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300`}>
        <UIProvider>
          {/* Top-loading navigation indicator */}
          <NavProgressBar />
          
          {/* Persistent Navigation Bar */}
          <Navbar />
          
          {/* Main Page Content */}
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
          
          {/* Global Footer */}
          <Footer />
        </UIProvider>
      </body>
    </html>
  );
}
