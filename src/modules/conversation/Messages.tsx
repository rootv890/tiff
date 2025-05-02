"use client"
import { tempMessages } from "@/lib/data"
import { ScrollArea } from "@/components/ui/scroll-area"
import Message from "./Message"
import { useEffect, useState } from "react"

const Messages = ({ channelId }: { channelId: string }) => {
	console.log(channelId)
	const [messages, setMessages] = useState(tempMessages)
	useEffect(() => {
		setMessages(tempMessages)
	}, [tempMessages])
	return (
		<ScrollArea
			type="auto"
			className="h-full p-4"
		>
			{messages.map((message) => (
				<Message
					key={message.id}
					message={message}
				/>
			))}
		</ScrollArea>
	)
}
export default Messages
