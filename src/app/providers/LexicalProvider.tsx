// components/EditorProvider.tsx
import { cn } from "@/lib/utils"
import { GifNode } from "@/modules/Lexical/GIF/GifNode"
import { MentionNode } from "@/modules/Lexical/Mentions/MentionNode"
import MentionPlugin from "@/modules/Lexical/Mentions/MentionPlugin"
import { CodeNode } from "@lexical/code"
import { LinkNode } from "@lexical/link"
import { ListItemNode, ListNode } from "@lexical/list"
import {
	LexicalComposer,
	type InitialConfigType,
} from "@lexical/react/LexicalComposer"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
const editorConfig: InitialConfigType = {
	namespace: "ChatEditor",
	theme: {},
	onError: (error) => {
		console.error("Lexical error:", error)
	},
}

const CSS = {
	inputContainer: cn(
		"border w-full relative border-none focus:outline-none focus-visible:ring-0 "
	),
	ContentEditable: cn(
		"p-4 active:border-input-border active:ring-0 outline-none active:outline-input-border"
	),
	placeholder: cn(
		"text-muted-foreground absolute top-1/2 left-0  transform pl-4 -translate-y-1/2 pointer-events-none"
	),
}

const initialConfig: InitialConfigType = {
	namespace: "chat-input",
	onError: (e) => console.error(e),
	nodes: [
		MentionNode,
		HeadingNode,
		CodeNode,
		ListNode,
		ListItemNode,
		LinkNode,
		QuoteNode,
		GifNode,
	],
	theme: {
		paragraph: "mb-1 text-base", // Tailwind class for paragraphs
		gif: "my-1 flex justify-center cursor-pointer",
		text: {
			bold: "font-bold",
			italic: "italic",
			underline: "underline",
			strikethrough: "line-through",
			code: "bg-zinc-200 dark:bg-zinc-700 px-1 py-0.5 rounded text-sm font-mono",
			underlineStrikethrough: "underline line-through",
		},
		heading: {
			h1: "text-2xl font-bold",
			h2: "text-xl font-semibold",
			h3: "text-lg font-medium",
		},
		list: {
			ul: "list-disc pl-6",
			ol: "list-decimal pl-6",
			listitem: "mb-1",
		},
		quote:
			"border-l-4 border-zinc-300 dark:border-zinc-600 pl-2 italic text-zinc-600 dark:text-zinc-400",
		code: "bg-zinc-100 dark:bg-zinc-800 p-2 rounded font-mono text-sm block whitespace-pre-wrap", // For CodeNode
		link: "text-blue-500 hover:underline",
	},
	editorState: null,
}

export default function LexicalProvider({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<LexicalComposer initialConfig={initialConfig}>
			<div className={CSS.inputContainer}>
				<MentionPlugin />
				<RichTextPlugin
					contentEditable={
						<ContentEditable
							className={CSS.ContentEditable}
							aria-placeholder="Chat with @username"
							placeholder={
								<div className={CSS.placeholder}>Chat with @username</div>
							}
						/>
					}
					ErrorBoundary={LexicalErrorBoundary}
				/>
			</div>
			{children}
			<HistoryPlugin />
		</LexicalComposer>
	)
}
