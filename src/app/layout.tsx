import { Theme, ThemePanel } from "@radix-ui/themes"
import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import { ModalProvider } from "./providers/ModalProvider"
import { QueryProvider } from "./providers/QueryProvider"
import { Toaster } from "@/components/ui/sonner"
import { SidebarProvider } from "@/components/ui/sidebar"
import { SocketProvider } from "./providers/SocketProvider"

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Tiff: Way cooler than discord",
	description: "A new way to argue with your friends.",
	icons: {
		icon: "/favicon.ico",
		// shortcut: "/favicon-32x32.png",
		// apple: "/apple-touch-icon.png",
	},
	// manifest: "/site.webmanifest",
}

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
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${geistMono.variable} ${ggSans.variable} antialiased`}>
				<QueryProvider>
					<SocketProvider>
						<Toaster
							richColors
							closeButton
							position="top-center"
							toastOptions={{
								style: {
									borderRadius: "12px",
									border: "1px solid #5865f2",
									padding: "10px",
								},
							}}
						/>
						<Theme appearance="dark">
							<SidebarProvider>
								<ModalProvider>{children}</ModalProvider>
								<ThemePanel defaultOpen={false} />
							</SidebarProvider>
						</Theme>
					</SocketProvider>
				</QueryProvider>
			</body>
		</html>
	)
}
