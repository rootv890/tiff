"use client"

import CategorySidebar from "@/modules/category/CategorySidebar"
import ChannelHeader from "@/modules/channel/ChannelHeader"
import MemberSidebar from "@/modules/member/MemberSidebar"
import { useParams } from "next/navigation"

const ServerLayout = ({ children }: { children: React.ReactNode }) => {
	const { sId, cId } = useParams()
	// validate the server and member e
	if (!sId) return <div className="h-full">Server not found</div>
	return (
		<div className="h-full flex flex-nowrap relative  w-full">
			<CategorySidebar serverId={sId as string} />
			<div className="h-full w-full flex flex-col">
				{cId && (
					<ChannelHeader
						serverId={sId as string}
						channelId={cId as string}
					/>
				)}
				<div className="h-full">{children}</div>
			</div>
			{/* <div className="max-h-20 bg-red-400  h-full relative"> */}
			<MemberSidebar />
			{/* </div> */}
		</div>
	)
}
export default ServerLayout
