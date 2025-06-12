// React Component for GifNode

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection"
import { mergeRegister } from "@lexical/utils"
import {
	$getNodeByKey,
	$getSelection,
	$isNodeSelection,
	CLEAR_EDITOR_COMMAND,
	CLICK_COMMAND,
	COMMAND_PRIORITY_LOW,
	KEY_BACKSPACE_COMMAND,
	KEY_DELETE_COMMAND,
	NodeKey,
} from "lexical"
import Image from "next/image"
import * as React from "react"
import { useCallback, useEffect, useRef } from "react"

interface GIFComponentProps {
	src: string
	altText: string
	nodeKey: NodeKey
}

const GifComponent: React.FC<GIFComponentProps> = ({
	src,
	altText,
	nodeKey,
}) => {
	const [editor] = useLexicalComposerContext()
	const [isSelected, setSelected] = useLexicalNodeSelection(nodeKey)
	const imgRef = useRef<HTMLImageElement | null>(null)
	const [isHovering, setIsHovering] = React.useState(false)

	const handleDelete = useCallback(() => {
		editor.update(() => {
			const node = $getNodeByKey(nodeKey)
			if (node && node.isAttached()) {
				node.remove()
			}
		})
	}, [editor, nodeKey])

	const onDelete = useCallback(
		(payload: KeyboardEvent) => {
			if (isSelected && $isNodeSelection($getSelection())) {
				const event: KeyboardEvent = payload
				event.preventDefault()
				handleDelete()
			}
			return false
		},
		[isSelected, handleDelete]
	)

	const clearSelection = useCallback(() => {
		// WARNING: This is a hack to clear the selection
		editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined)
	}, [editor])

	const onDeleteKeyboard = useCallback(
		(payload: KeyboardEvent) => {
			if (isSelected && $isNodeSelection($getSelection())) {
				const event: KeyboardEvent = payload
				event.preventDefault()
				handleDelete() // Use the common delete handwler
			}
			return false
		},
		[isSelected, handleDelete]
	)

	useEffect(() => {
		return mergeRegister(
			editor.registerCommand<MouseEvent>(
				CLICK_COMMAND,
				(event) => {
					const img = imgRef.current
					// Check if the click is on the image itself, not the delete button
					if (img && img.contains(event.target as Node)) {
						// If the target is the delete button, let its own onClick handle it
						if (
							(event.target as HTMLElement).closest("[data-delete-gif-button]")
						) {
							return true // Indicate command was handled to stop propagation if needed
						}
						if (!event.shiftKey) {
							clearSelection()
						}
						setSelected(!isSelected)
						return true
					}
					return false
				},
				COMMAND_PRIORITY_LOW
			),
			editor.registerCommand(
				KEY_DELETE_COMMAND,
				onDeleteKeyboard,
				COMMAND_PRIORITY_LOW
			),
			editor.registerCommand(
				KEY_BACKSPACE_COMMAND,
				onDeleteKeyboard,
				COMMAND_PRIORITY_LOW
			)
		)
	}, [
		clearSelection,
		editor,
		isSelected,
		nodeKey,
		onDeleteKeyboard,
		setSelected,
	])

	const containerStyle: React.CSSProperties = {
		position: "relative", // Needed for absolute positioning of the delete button
		display: "inline-block", // Or 'block' depending on desired layout
		cursor: "default",
		maxWidth: "300px", // Match image max width
	}

	const imgStyle: React.CSSProperties = {
		maxWidth: "300px",
		maxHeight: "200px",
		borderRadius: "8px",
		border: isSelected ? "2px solid #007bff" : "2px solid transparent",
		display: "block", // Ensures the image takes up its own line if container is block
	}

	const deleteButtonStyle: React.CSSProperties = {
		position: "absolute",
		top: "8px",
		right: "8px",
		backgroundColor: "rgba(0, 0, 0, 0.6)",
		color: "white",
		border: "none",
		borderRadius: "50%",
		width: "24px",
		height: "24px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		cursor: "pointer",
		fontSize: "14px",
		lineHeight: "1",
		zIndex: 10, // Ensure it's above the image
		opacity: isHovering ? 1 : 0, // Show only on hover
		transition: "opacity 0.2s ease-in-out",
	}

	return (
		<div
			style={containerStyle}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			data-lexical-decorator-node="true" // Good practice for decorator nodes
		>
			<img
				ref={imgRef}
				src={src}
				alt={altText}
				style={imgStyle}
				data-lexical-gif-image="true"
			/>
			{/* Conditionally render delete button */}
			{/* Also check isSelected, so delete button appears on hover OR if selected (optional UX choice) */}
			{(isHovering || isSelected) && (
				<button
					style={deleteButtonStyle}
					onClick={(e) => {
						e.stopPropagation() // Prevent click from bubbling to the selection logic
						handleDelete()
					}}
					aria-label="Delete GIF"
					title="Delete GIF"
					data-delete-gif-button="true" // For targeting in CLICK_COMMAND if needed
				>
					&#x2715; {/* HTML entity for 'X' (multiplication sign) */}
				</button>
			)}
		</div>
	)
}

export default GifComponent
