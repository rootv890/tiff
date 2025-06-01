"use client"

import LexicalProvider from "@/app/providers/LexicalProvider"
import { cn } from "@/lib/utils"
import EmojiPicker from "./EmojiPicker"
import GifPicker from "./GIF/GifPicker"

const CSS: Record<string, string> = {
	chatInputContainer: cn(
		"flex items-start gap-2 w-full h-full border border-input-border rounded-3xl focus:outline-none focus-visible:ring-0 pr-4"
	),
	editorArea: cn(
		"flex-grow p-2" // Takes up available space
	),
	toolbarContainer: cn(
		"flex items-center gap-1 p-2 border-t border-zinc-200 dark:border-zinc-700" // Toolbar at the bottom
	),
} as const

const ChatEditor = () => {
	return (
		<div className={CSS.chatInputContainer}>
			<LexicalProvider>
				<div className={CSS.editorArea}>
					<div className="flex items-center gap-2 ">
						<EmojiPicker />
						<GifPicker />
					</div>
				</div>
				<div className={CSS.toolbarContainer}></div>
			</LexicalProvider>
		</div>
	)
}
export default ChatEditor
