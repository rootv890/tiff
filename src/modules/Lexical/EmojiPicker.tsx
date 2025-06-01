"use client"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
	$getRoot,
	$getSelection,
	$isRangeSelection,
	COMMAND_PRIORITY_LOW,
} from "lexical"
import { useEffect, useRef, useState } from "react"
import { INSERT_TEXT_COMMAND } from "./commands"

type Props = {}

const EmojiPicker = (props: Props) => {
	const [editor] = useLexicalComposerContext()
	const [showEmojiPicker, setShowEmojiPicker] = useState(false)
	const emojiPickerRef = useRef<HTMLDivElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)

	// Register the Lexical command
	useEffect(() => {
		return editor.registerCommand(
			INSERT_TEXT_COMMAND,
			(emoji: string) => {
				const selection = $getSelection()
				if ($isRangeSelection(selection)) {
					selection.insertText(emoji)
					return true
				}
				return false
			},
			COMMAND_PRIORITY_LOW
		)
	}, [editor])

	// Click outside to close
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				emojiPickerRef.current &&
				!emojiPickerRef.current.contains(event.target as Node) &&
				!buttonRef.current?.contains(event.target as Node)
			) {
				setShowEmojiPicker(false)
			}
		}

		if (showEmojiPicker) {
			document.addEventListener("mousedown", handleClickOutside)
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [showEmojiPicker])

	// function insertEmoji(emoji: any) {
	// 	editor.dispatchCommand(INSERT_TEXT_COMMAND, emoji.native)
	// 	setShowEmojiPicker(false)
	// }

	// with force focus
	function insertEmoji(emoji: any) {
		editor.update(() => {
			const selection = $getSelection()

			if (!$isRangeSelection(selection)) {
				// No selection? Create one at the end of the document
				const root = editor.getRootElement()
				if (root) {
					// Move focus to editor
					editor.focus()

					// Select the last position (collapsed)
					const rootNode = editor.getEditorState().read(() => {
						return $getRoot()
					})
					// Collapse selection at the end
					const textNode = rootNode.getLastDescendant()
					if (textNode) {
						textNode.selectEnd()
					}
				}
			}
			// Now insert the emoji
			const newSelection = $getSelection()
			if ($isRangeSelection(newSelection)) {
				newSelection.insertText(emoji.native)
			}
		})
		setShowEmojiPicker(false)
	}

	return (
		<div className="w-fit relative">
			<button
				ref={buttonRef}
				onClick={() => setShowEmojiPicker((prev) => !prev)}
				className="text-xl p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition grayscale-100"
				aria-label="Insert Emoji"
			>
				😊
			</button>

			{showEmojiPicker && (
				<div
					ref={emojiPickerRef}
					className="absolute bottom-full mb-2 right-0 z-50 bg-zinc-800 border border-zinc-700 shadow-lg rounded-lg"
				>
					<Picker
						onEmojiSelect={insertEmoji}
						theme="dark"
						data={data}
						navPosition="top"
						emojiSize={20}
						skinTonePosition="none"
					/>
				</div>
			)}
		</div>
	)
}

export default EmojiPicker
