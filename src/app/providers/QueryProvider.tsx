"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient()

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient}>
			{/* <ReactQueryDevtools /> */}
			{children}
		</QueryClientProvider>
	)
}

/**
 * Additional Things
 * 1. Check for user's login session
 * 2. If user is not logged in, redirect to login page
 */
