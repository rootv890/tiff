"use client"

import { useSocket } from "@/app/providers/SocketProvider"
import { cn } from "@/lib/utils"
import { useEffect, useMemo } from "react"
import {
	GrStatusDisabledSmall as FAIL,
	GrStatusCriticalSmall as WAIT,
	GrStatusGoodSmall as YES,
} from "react-icons/gr"

const SocketIndicator = () => {
	const { isConnected, transport, socket } = useSocket()

	const style = useMemo(() => {
		return cn(
			"size-2",
			isConnected ?
				transport === "websocket" ?
					"text-green-500"
				:	"text-orange-500"
			:	"text-red-500"
		)
	}, [isConnected, transport])

	// emit hello world
	useEffect(() => {
		socket?.emit("hello", "from socket indicator")
	}, [])

	return (
		<div className="flex items-center gap-1">
			{isConnected ?
				transport === "websocket" ?
					<YES className={style} />
				:	<WAIT className={style} />
			:	<FAIL className={style} />}
			<span className="text-xs">{transport}</span>
		</div>
	)
}
export default SocketIndicator
