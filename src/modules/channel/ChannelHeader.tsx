import { getChannelById } from "@/actions/server/channel"
import { GetChannelIcon } from "@/components/GetChannelIcon"
import { cn } from "@/lib/utils"
import { QUERY_KEYS } from "@/queryKeys"
import { ChannelEnum } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { motion } from "motion/react"
import SearchInput from "../searches/SearchInput"

// queryFactory
const useChannel = (channelId: string) => {
	return useQuery({
		queryKey: [QUERY_KEYS.CHANNEL, { channelId }],
		queryFn: async () => await getChannelById(channelId),
		enabled: !!channelId,
		placeholderData: (prevData) => prevData,
	})
}

const ChannelHeader = ({
	serverId,
	channelId,
}: {
	serverId: string
	channelId: string
}) => {
	const { data, isPlaceholderData } = useChannel(channelId)

	return (
		<div
			className="h-16 w-full bg-background flex justify-between items-center p-2 px-4
      "
		>
			<div
				className={cn(
					"flex items-center gap-x-2",
					isPlaceholderData && "opacity-30"
				)}
			>
				<GetChannelIcon
					className="size-5 text-muted-foreground"
					channelType={data?.data?.type as ChannelEnum}
				/>
				<motion.span
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ type: "spring", stiffness: 300, damping: 24 }}
					className="text-lg font-semibold text-foreground"
				>
					{data?.data?.name}
				</motion.span>
			</div>
			<div>
				<SearchInput />
				{/* MemberSidebar trigger */}
			</div>
		</div>
	)
}

export default ChannelHeader
