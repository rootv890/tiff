import { Theme, ThemePanel } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ModalProvider } from "./providers/ModalProvider";
import { QueryProvider } from "./providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Tiff is a discord like/clone
  title: "Tiff",
  description: "A new way to argue with your friends.",
};

const ggSans = localFont({
  src: [
    {
      path: "/fonts/ggsans-Normal.woff2",
      weight: "400",
    },
    {
      path: "/fonts/ggsans-Medium.woff2",
      weight: "500",
    },
    {
      path: "/fonts/ggsans-Semibold.woff2",
      weight: "600",
    },
    {
      path: "/fonts/ggsans-Bold.woff2",
      weight: "700",
    },
    {
      path: "/fonts/ggsans-ExtraBold.woff2",
      weight: "900",
    },
  ],
  variable: "--font-ggsans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${geistMono.variable} ${ggSans.variable} antialiased`}>
        <Toaster richColors />
        <Theme appearance="dark">
          <QueryProvider>
            <ModalProvider>{children}</ModalProvider>
          </QueryProvider>
          <ThemePanel defaultOpen={false} />
        </Theme>
      </body>
    </html>
  );
}
