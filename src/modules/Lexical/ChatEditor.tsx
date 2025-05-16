"use client"

import { cn } from "@/lib/utils"
import { CodeNode } from "@lexical/code"
import { LinkNode } from "@lexical/link"
import { ListItemNode, ListNode } from "@lexical/list"
import { $convertToMarkdownString, TRANSFORMERS } from "@lexical/markdown"
import {
	InitialConfigType,
	LexicalComposer,
} from "@lexical/react/LexicalComposer"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { $getRoot, $getSelection } from "lexical"
import { MentionNode } from "./Mentions/MentionNode"
import MentionPlugin from "./Mentions/MentionPlugin"

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

const CSS: Record<string, string> = {
	inputContainer: cn(
		"border w-full relative border-input-border rounded-3xl focus:outline-none focus-visible:ring-0 "
	),
	ContentEditable: cn(
		"p-4 active:border-input-border active:ring-0 outline-none active:outline-input-border"
	),
	placeholder: cn(
		"text-muted-foreground absolute top-1/2 left-0  transform pl-4 -translate-y-1/2 pointer-events-none"
	),
} as const

const ChatEditor = () => {
	// const [editor] = useLexicalComposerContext()
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

			<HistoryPlugin />
		</LexicalComposer>
	)
}
export default ChatEditor
