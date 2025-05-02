import { MessageType } from "@/types"
import Profile from "./profile"

const Message = ({ message }: { message: MessageType }) => {
	const time = new Date(message.createdAt).toLocaleString("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		day: "2-digit",
		month: "2-digit",
		year: "2-digit",
	})

	return (
		<div className="mb-4 flex items-start justify-start  p-2 rounded-md h-auto hover:bg-active gap-3">
			{/* profile  */}
			<Profile
				src={message.author.image!}
				name={message.author.name}
			/>
			<div className="flex flex-col items-start gap-px justify-start">
				<div className="flex items-center gap-2 justify-start">
					{/* Name and time */}
					<p className="text-sm cursor-pointer hover:underline underline-offset-2 font-medium">
						{message.author.name}
					</p>
					<p className="text-xs text-muted-foreground">{time}</p>
					{/* Message content */}
				</div>
				<p className="text-sm break-words">{message.content}</p>
			</div>
		</div>
	)
}
export default Message
