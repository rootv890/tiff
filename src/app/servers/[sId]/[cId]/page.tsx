"use client"

import ChatInput from "@/modules/conversation/ChatInput"
import Messages from "@/modules/conversation/Messages"
import { useParams } from "next/navigation"

const ChannelPage = () => {
	const { cId } = useParams()
	return (
		// #070709
		<div className="h-full w-full bg-background relative ">
			<Messages channelId={cId as string} />
			<div className="h-16 w-full absolute right-0 bottom-4 !origin-bottom  px-6 ">
				<ChatInput channelId={cId as string} />
			</div>
		</div>
	)
}
export default ChannelPage

// ₿0.0001288061
//
