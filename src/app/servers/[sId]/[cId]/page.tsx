"use client"

import ChatInput from "@/modules/conversation/ChatInput"
import Messages from "@/modules/conversation/Messages"
import { useParams } from "next/navigation"

const ChannelPage = () => {
	const { cId } = useParams()
	return (
		<div className="h-full w-full relative ">
			<Messages channelId={cId as string} />
			<div className="h-16 w-full absolute bottom-4 px-6 ">
				<ChatInput channelId={cId as string} />
			</div>
		</div>
	)
}
export default ChannelPage
