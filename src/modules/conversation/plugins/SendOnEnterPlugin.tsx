// SendOnEnterPlugin.tsx
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { COMMAND_PRIORITY_HIGH, KEY_ENTER_COMMAND } from "lexical"
import { useEffect } from "react"

export function SendOnEnterPlugin({
	onSend,
}: {
	onSend: (editor: any) => void
}) {
	const [editor] = useLexicalComposerContext()

	useEffect(() => {
		return editor.registerCommand(
			KEY_ENTER_COMMAND,
			(event) => {
				if (!event?.shiftKey) {
					event?.preventDefault()
					editor.update(() => {
						const rawText = editor
							.getEditorState()
							.read(() => editor.getRootElement()?.innerText?.trim())

						if (rawText) {
							onSend(editor)
						}
					})
					return true
				}
				return false
			},
			COMMAND_PRIORITY_HIGH
		)
	}, [editor, onSend])

	return null
}
