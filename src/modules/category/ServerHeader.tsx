"use client"

import { ServerType } from "@/types"
import { Skeleton } from "@radix-ui/themes"
import { useState } from "react"
import { ServerDropdown } from "./ServerDropdown"
import { CreateCategoryModal } from "./mnf/CreateCategoryModal"
import { InviteToServerModal } from "../server/InviteToServer"

interface ServerHeaderProps {
	serverData: ServerType
}

const ServerHeader = ({ serverData }: ServerHeaderProps) => {
	if (!serverData) return <ServerHeaderSkeleton />

	// Use banner styling directly on parent element
	const bannerStyle =
		serverData?.banner?.type === "solid" ?
			{ backgroundColor: serverData.banner.color }
		: serverData?.banner?.url ?
			{
				backgroundImage: `url(${serverData.banner.url})`,
				backgroundSize: "cover",
			}
		: serverData?.banner?.gradient ?
			{
				backgroundImage: `linear-gradient(${serverData.banner.gradient.angle || 135}deg, ${serverData.banner.gradient.from || "#3d48b9"}, ${serverData.banner.gradient.to || "#5865f2"})`,
			}
		:	{ backgroundImage: "linear-gradient(135deg, #3d48b9, #5865f2)" }

	const [open, setOpen] = useState(false)

	if (!serverData) return <ServerHeaderSkeleton />

	return (
		<div
			className="w-[calc(100%+1rem)] h-32 relative -m-2 mask-b-from-0 mask-b-to-100"
			style={bannerStyle}
		>
			<div
				className="hover:bg-card/20 hover:backdrop-blur-xl h-14 flex px-4 items-center justify-between relative z-10"
				onClick={() => setOpen(!open)}
			>
				{/* title of the server */}
				<div>
					<h3 className="font-semibold text-lg">{serverData.name}</h3>
				</div>
				<div>
					<ServerDropdown
						dropDownOpen={open}
						setDropDownOpen={setOpen}
					/>
				</div>
			</div>
			{/* All modals */}
			<CreateCategoryModal />
			<InviteToServerModal />
		</div>
	)
}
export default ServerHeader

/**
 * Skeleton Banner Component
 * Displays a placeholder gradient when loading
 */
export function SkeletonBanner() {
	return (
		<div className="absolute top-0 left-0 w-full h-32 overflow-hidden z-0">
			<div className="w-full h-full bg-gradient-to-br from-muted/30 to-muted/50" />
			{/* Overlay gradient for text readability */}
			<div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-card/80 to-transparent" />
		</div>
	)
}

export function ServerHeaderSkeleton() {
	return (
		<div className="w-[calc(100%+1rem)] h-32 relative -m-2">
			<SkeletonBanner />
			<div className="bg-card/50 backdrop-blur-sm h-14 flex px-4 items-center justify-between relative z-10">
				<div>
					<h3 className="font-semibold text-lg">
						<Skeleton className="w-32 h-4" />
					</h3>
				</div>
				<div>
					<ServerDropdown />
				</div>
			</div>
		</div>
	)
}
