import { $getRoot, COMMAND_PRIORITY_HIGH, KEY_ENTER_COMMAND } from "lexical"
import React, { useEffect, useState } from "react"

import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"

// ✅ Theme & Error Handler
const theme = {}
function onError(error: Error) {
	console.error(error)
}

// ✅ ENTER plugin to submit rich+plain
function EnterKeyPlugin({
	onSubmit,
}: {
	onSubmit: ({
		content_json,
		content_text,
	}: {
		content_json: any
		content_text: string
	}) => void
}) {
	const [editor] = useLexicalComposerContext()

	useEffect(() => {
		return editor.registerCommand(
			KEY_ENTER_COMMAND,
			(event) => {
				if (!event) return false
				if (event.shiftKey) return false

				event.preventDefault()

				const plainText = editor
					.getEditorState()
					.read(() => $getRoot().getTextContent())
				const editorState = editor.getEditorState()
				const json = editorState.toJSON()

				const isEmptyJSON =
					json.root.children.length === 0 ||
					(json.root.children.length === 1 &&
						// @ts-ignore
						json.root.children[0].children.length === 0)

				if (!isEmptyJSON) {
					onSubmit({
						content_json: json,
						content_text: plainText,
					})
					editor.update(() => {
						$getRoot().clear()
					})
				}

				return true
			},
			COMMAND_PRIORITY_HIGH
		)
	}, [editor, onSubmit])

	return null
}

// ✅ Read-only render plugin
function ReadOnlyPlugin({ json }: { json: any }) {
	const [editor] = useLexicalComposerContext()

	useEffect(() => {
		if (!json || Object.keys(json).length === 0) {
			console.warn("Empty or invalid editor JSON, skipping state restore.")
			return
		}
		try {
			const editorState = editor.parseEditorState(json)
			editor.setEditorState(editorState, { tag: "restore" })
			editor.setEditable(false)
		} catch (err) {
			console.error("Failed to parse editor JSON:", err)
		}
	}, [editor, json])

	return null
}

// ✅ Rich Message Renderer
export const RichMessageRenderer = ({ contentJSON }: { contentJSON: any }) => {
	const initialConfig = {
		namespace: "chat-viewer",
		theme,
		editable: false,
		onError,
	}

	return (
		<LexicalComposer initialConfig={initialConfig}>
			<RichTextPlugin
				ErrorBoundary={LexicalErrorBoundary}
				contentEditable={
					<ContentEditable className="border p-2 bg-muted rounded-md text-muted-foreground" />
				}
			/>
			<ReadOnlyPlugin json={contentJSON} />
		</LexicalComposer>
	)
}

// ✅ Editor with Preview
const MessageEditor = ({
	onSubmit,
}: {
	onSubmit: ({
		content_json,
		content_text,
	}: {
		content_json: any
		content_text: string
	}) => void
}) => {
	const initialConfig = {
		namespace: "message-editor",
		theme,
		onError,
	}

	return (
		<LexicalComposer initialConfig={initialConfig}>
			<RichTextPlugin
				contentEditable={
					<ContentEditable
						className="border bg-input border-input-border rounded-md p-2 min-h-13.5 w-full max-w-3xl text-foreground text-lg"
						placeholder={
							<div className="absolute top-2 left-2  text-muted-foreground">
								Enter your message @channel name
							</div>
						}
						aria-placeholder="Enter your message @channel name"
					/>
				}
				ErrorBoundary={LexicalErrorBoundary}
			/>
			<HistoryPlugin />
			<EnterKeyPlugin onSubmit={onSubmit} />
		</LexicalComposer>
	)
}

export default MessageEditor
