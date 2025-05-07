import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getSelection } from "lexical"
import { useEffect } from "react"
import MentionNode from "../nodes/MentionNode"

// This plugin listens for "Ctrl + @" key and inserts a fake @alex mention
export function MentionTestPlugin() {
	const [editor] = useLexicalComposerContext()

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === "@" && e.ctrlKey) {
				e.preventDefault()

				editor.update(() => {
					const selection = $getSelection()
					if (selection) {
						const mention = new MentionNode("alex")
						selection.insertNodes([mention])
					}
				})
			}
		}

		// Listen for keydown
		window.addEventListener("keydown", handler)

		// Cleanup on unmount
		return () => window.removeEventListener("keydown", handler)
	}, [editor])

	return null
}
