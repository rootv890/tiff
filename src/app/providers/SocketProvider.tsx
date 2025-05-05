"use client"
import socketClient from "@/socket/socket"
import { createContext, useContext, useEffect, useState } from "react"
import { Socket } from "socket.io-client"

type TransportType = "websocket" | "webtransport" | "polling" | "N/A"

// Create a type for Context
type SocketContextType = {
	// states
	isConnected: boolean
	transport: TransportType

	// actions
	socket: Socket | null
	setIsConnected: (isConnected: boolean) => void
	setTransport: (transport: TransportType) => void
}

// Conext Creation
const SocketContext = createContext<SocketContextType>({
	isConnected: false,
	transport: "N/A",

	socket: null,
	setIsConnected: () => {},
	setTransport: () => {},
})

export const useSocket = () => useContext(SocketContext)

// Provider
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const [isConnected, setIsConnected] = useState(false)
	const [socket, setSocket] = useState<Socket | null>(null)

	useEffect(() => {
		if (typeof window !== "undefined") {
			setSocket(socketClient as Socket)
		}
	}, [])

	const [transport, setTransport] = useState<TransportType>("N/A")

	useEffect(() => {
		if (!socket) return

		if (socket?.connected) {
			onConnect()
		}
		// On Connect
		function onConnect() {
			if (!socket) return
			console.log("🔌 Socket connected!", socket?.id)

			// Set state
			setIsConnected(true)
			setTransport(socket.io.engine.transport.name as TransportType)

			// Emit once we're fully connected
			socket.emit("hello", {
				message: "Hello from client (onConnect)!",
				timestamp: new Date().toISOString(),
			})

			// Listen for transport upgrades (e.g., from polling → websocket)
			socket.io.engine.on("upgrade", (upgradedTransport) => {
				console.log("🔁 Transport upgraded:", upgradedTransport.name)
				setTransport(upgradedTransport.name as TransportType)
			})
		}

		// On Disconnect
		function onDisconnect() {
			setIsConnected(false)
			setTransport("N/A")
		}

		// On Connection Error
		function onConnectError(error: Error) {
			console.error("Socket connection error:", error)
			setIsConnected(false)
			setTransport("N/A")
		}

		socket.on("connect", onConnect)
		socket.on("connect_error", onConnectError)
		socket.on("disconnect", onDisconnect)

		// Force a reconnection attempt if not connected
		if (!socket.connected) {
			console.log("Socket not connected, attempting to connect...")
			socket.connect()
		}

		return () => {
			socket.off("connect", onConnect)
			socket.off("connect_error", onConnectError)
			socket.off("disconnect", onDisconnect)
		}
	}, [socket])

	return (
		<SocketContext.Provider
			value={{
				isConnected,
				setIsConnected,
				setTransport,
				socket,
				transport,
			}}
		>
			{children}
		</SocketContext.Provider>
	)
}
