import Button from "@/components/tiffui/Button"
import { Input } from "@/components/tiffui/Input"
import { tempMessages } from "@/lib/data"
import { MessageType } from "@/types"
import { useForm } from "react-hook-form"
import { useServer } from "@/hooks/useServer"
import { User } from "@/auth/auth"
import Debugger from "@/components/tiffui/Debugger"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"

const ChatInput = ({ channelId }: { channelId: string }) => {
	const { user } = useServer()
	const [content, setContent] = useState("")
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

	console.log(tempMessages)
	return (
		<form
			onSubmit={(event) => {
				event.preventDefault()
				onSubmit({ content })
				setContent("")
			}}
		>
			<div className="flex items-center gap-2 h-16 ">
				<Input
					type="text"
					className="flex-1 h-full bg-background"
					name="content"
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
				<Button
					size="lg"
					type="submit"
				>
					Send
				</Button>
			</div>
		</form>
	)
}
export default ChatInput
