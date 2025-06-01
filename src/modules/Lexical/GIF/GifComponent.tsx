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

	const onDelete = useCallback(
		(payload: KeyboardEvent) => {
			if (isSelected && $isNodeSelection($getSelection())) {
				const event: KeyboardEvent = payload
				event.preventDefault()
				const node = $getNodeByKey(nodeKey)
				if (node && node.isAttached()) {
					node.remove()
				}
			}
			return false
		},
		[isSelected, nodeKey]
	)

	const clearSelection = useCallback(() => {
		// WARNING: This is a hack to clear the selection
		editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined)
	}, [editor])

	useEffect(() => {
		return mergeRegister(
			editor.registerCommand<MouseEvent>(
				CLICK_COMMAND,
				(event) => {
					const img = imgRef.current
					if (event.target === img) {
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
				onDelete,
				COMMAND_PRIORITY_LOW
			),
			editor.registerCommand(
				KEY_BACKSPACE_COMMAND,
				onDelete,
				COMMAND_PRIORITY_LOW
			)
		)
	}, [clearSelection, editor, isSelected, nodeKey, onDelete, setSelected])
	const imgStyle: React.CSSProperties = {
		maxWidth: "300px",
		maxHeight: "200px",
		borderRadius: "8px",
		cursor: "default",
		border: isSelected ? "2px solid #007bff" : "2px solid transparent",
	}
	return (
		// <Image
		// 	ref={imgRef}
		// 	alt={altText}
		// 	src={src}
		// 	style={imgStyle}
		// 	width={300}
		// 	height={200}
		// 	data-lexical-gif="true"
		// />
		<img
			ref={imgRef}
			alt={altText}
			src={src}
			style={imgStyle}
			data-lexical-gif="true"
		/>
	)
}

export default GifComponent
