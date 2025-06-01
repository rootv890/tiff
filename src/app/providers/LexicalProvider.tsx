// components/EditorProvider.tsx
import { cn } from "@/lib/utils"
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
	],
	theme: {
		paragraph: "mb-1 text-base", // Tailwind class for paragraphs
	},
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
