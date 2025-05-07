import React, { useEffect } from "react"

// Lexical core nodes
import { $getRoot, $getSelection } from "lexical"

// Node types
import { CodeNode } from "@lexical/code"
import { LinkNode } from "@lexical/link"
import { ListItemNode, ListNode } from "@lexical/list"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"

// Markdown conversion tools
import {
	$convertToMarkdownString,
	ELEMENT_TRANSFORMERS,
	TEXT_FORMAT_TRANSFORMERS,
	TRANSFORMERS,
} from "@lexical/markdown"

// Lexical Composer (main config wrapper)
import {
	InitialConfigType,
	LexicalComposer,
} from "@lexical/react/LexicalComposer"

// Core plugins
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"

// Custom Nodes & Plugins
import MentionNode from "./nodes/MentionNode" // your custom mention node
import { MentionPlugin } from "./plugins/MentionPlugin"
import { MentionTestPlugin } from "./plugins/MentionTestPlugin"
import { SendOnEnterPlugin } from "./plugins/SendOnEnterPlugin"

// Mention test plugin

const Editor = () => {
	// Editor config: Define nodes and theme here
	const initialConfig: InitialConfigType = {
		namespace: "chat-input",
		onError: (e) => console.error(e),
		nodes: [
			HeadingNode,
			CodeNode,
			ListNode,
			ListItemNode,
			LinkNode,
			QuoteNode,
			MentionNode, // custom node
		],
		theme: {
			paragraph: "mb-1 text-base", // Tailwind class for paragraphs
		},
	}

	// When user presses Enter (or triggers send), handle it here
	const onSend = (editor: any) => {
		const editorState = editor.getEditorState()

		// Read current content and convert to Markdown
		editorState.read(() => {
			const markdown = $convertToMarkdownString(TRANSFORMERS)
			console.log("markdown sent", markdown)
		})

		// Clear the editor content
		editor.update(() => {
			$getRoot().clear()
		})
	}

	return (
		<LexicalComposer initialConfig={initialConfig}>
			<div className="bg-input  w-screen mx-8 mt-12 rounded-lg border border-input-border p-4">
				<div className="relative w-full h-full">
					<RichTextPlugin
						contentEditable={
							<ContentEditable className="min-h-[40px] w-full outline-none text-sm text-gray-900 dark:text-white" />
						}
						ErrorBoundary={LexicalErrorBoundary}
						placeholder={
							<div className="text-gray-400 absolute top-0 pointer-events-none select-none">
								Type a message…
							</div>
						}
					/>

					{/* History (undo/redo support) */}
					<HistoryPlugin />

					{/* Realtime text change tracking (optional debug) */}
					<OnChangePlugin
						onChange={(editorState, editor, tags) => {
							editorState.read(() => {
								const root = $getRoot()
								const selection = $getSelection()
								const text = root.getTextContent()
								// console.log(text); // debug log
							})
						}}
					/>

					{/* Enables Markdown shortcuts like **bold** and # headings */}
					<MarkdownShortcutPlugin
						transformers={[
							...ELEMENT_TRANSFORMERS,
							...TEXT_FORMAT_TRANSFORMERS,
						]}
					/>

					{/* Custom plugin to send message on Enter */}
					<SendOnEnterPlugin onSend={onSend} />

					{/* Test plugin for inserting @alex using Ctrl + @ */}
					<MentionPlugin />
				</div>
			</div>
		</LexicalComposer>
	)
}

export default Editor
