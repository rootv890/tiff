"use client"
import { User } from "@/auth/auth"
import Button from "@/components/tiffui/Button"
import Debugger from "@/components/tiffui/Debugger"
import { Input } from "@/components/tiffui/Input"
import { Textarea } from "@/components/ui/textarea"
import { useServer } from "@/hooks/useServer"

import { useEffect, useState } from "react"

import { tempMessages } from "@/lib/data"
import MessageEditor, { RichMessageRenderer } from "./Editor"

const ChatInput = ({ channelId }: { channelId: string }) => {
	const { user } = useServer()
	const [content, setContent] = useState("")
	const [tempState, setTempState] = useState<any[]>([])
	const [tempJSONState, setTempJSONState] = useState<any[]>([])

	// submit event to send the message
	const onSubmit = (data: { content: string }) => {
		tempMessages.push({
			...data,
			id: (tempMessages.length + 1).toString(),
			createdAt: new Date(),
			updatedAt: new Date(),
			channelId,
			authorId: user?.id || "",
			content: data.content || "",
			author: user || ({} as User),
			replyToId: null,
			isEdited: false,
			deletedAt: null,
		})
	}

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault()
				if (content.trim() === "") return
				alert("Message sent")
				onSubmit({ content })
				setContent("")
			}}
			className="w-screen origin-bottom  h-screen flex flex-col items-center"
		>
			{/* render rich */}
			{tempJSONState.map((message, index) => (
				<RichMessageRenderer
					contentJSON={message}
					key={index}
				/>
			))}
			{/* {JSON.stringify(tempState)} */}
			<div className="flex items-center relative gap-2 h-13.5 origin-bottom  w-full bg-input ">
				<MessageEditor
					onSubmit={(data) => {
						setTempState((prev) => [...prev, data.content_text])
						setTempJSONState((prev) => [...prev, data.content_json])
					}}
				/>
			</div>
		</form>
	)
}
export default ChatInput
