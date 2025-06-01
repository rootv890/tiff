"use client"

import LexicalProvider from "@/app/providers/LexicalProvider"
import { cn } from "@/lib/utils"
import EmojiPicker from "./EmojiPicker"

const CSS: Record<string, string> = {
	chatInputContainer: cn(
		"flex items-start gap-2 w-full h-full border border-input-border rounded-3xl focus:outline-none focus-visible:ring-0 pr-4"
	),
} as const

const ChatEditor = () => {
	return (
		<div className={CSS.chatInputContainer}>
			<LexicalProvider>
				<div className="flex items-center gap-2 pt-3">
					<EmojiPicker />
				</div>
			</LexicalProvider>
		</div>
	)
}
export default ChatEditor
