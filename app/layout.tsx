import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/Sidebar/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

const inter = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "John CEO",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <div className="flex overflow-hidden h-screen">
          <aside>
            <Sidebar />
          </aside>
          <div className=" h-screen w-full px-10 py-5 bg-[#F1F4F6] ">
            <main className="">{children}</main>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
