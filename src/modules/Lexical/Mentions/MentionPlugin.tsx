"use client"
import { User } from "@/auth/auth"
import { tempUsers } from "@/lib/data"
import { autoUpdate, offset, useFloating } from "@floating-ui/react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
	$createTextNode,
	$getSelection,
	$insertNodes,
	$isRangeSelection,
	$isTextNode,
	COMMAND_PRIORITY_LOW,
	createCommand,
} from "lexical"
import { useEffect, useState } from "react"
import { MentionNode } from "./MentionNode"

type Props = {}
const INSERT_MENTION_COMMAND = createCommand<{ id: string; username: string }>(
	"INSERT_MENTION"
)

function MentionPlugin({}: Props) {
	const [editor] = useLexicalComposerContext()
	const [query, setQuery] = useState<string>("")
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [filteredUsers, setFilteredUsers] = useState<User[]>(tempUsers)

	const { refs, floatingStyles } = useFloating({
		placement: "top-start",
		middleware: [offset(20)],
		whileElementsMounted: autoUpdate,
	})

	// Command handler: only proceed if there's a valid @match
	useEffect(() => {
		return editor.registerCommand(
			INSERT_MENTION_COMMAND,
			(payload) => {
				const { id, username } = payload
				editor.update(() => {
					const selection = $getSelection()
					if (!$isRangeSelection(selection)) {
						return
					}
					const anchor = selection.anchor
					const node = anchor.getNode()
					if (!$isTextNode(node)) {
						return
					}
					const offset = anchor.offset || 0
					const text = node.getTextContent().slice(0, offset)
					const match = text.match(/@([a-zA-Z0-9_]+)$/)
					if (!match) {
						return
					}
					const fullMatch = match[0]
					const start = offset - fullMatch.length
					// remove the '@query' trigger text before adding the MENTION
					node.spliceText(start, fullMatch.length, "")

					// insert mention + space
					const mentionNode = new MentionNode(id, username)
					$insertNodes([mentionNode, $createTextNode(" ")])
				})
				return true
			},
			COMMAND_PRIORITY_LOW
		)
	}, [editor])

	/*
	 * Update listener: open/close dropdown based on valid @match
	 * Opens when @query is present and closes when @query is removed
	 */
	useEffect(() => {
		return editor.registerUpdateListener(({ editorState }) => {
			editorState.read(() => {
				const selection = $getSelection()
				if (!$isRangeSelection(selection)) {
					setIsOpen(false)
					return
				}
				const anchor = selection.anchor
				const node = anchor.getNode()
				if (!$isTextNode(node)) {
					setIsOpen(false)
					return
				}
				const offset = anchor.offset || 0
				const text = node.getTextContent().slice(0, offset)
				const match = text.match(/@([a-zA-Z0-9_]+)$/)
				if (match) {
					const term = match[1] || ""
					setQuery(term)
					setFilteredUsers(
						tempUsers.filter((user) =>
							user.username.toLowerCase().includes(term.toLowerCase())
						)
					)
					const dom = editor.getElementByKey(node.getKey())
					if (dom) {
						refs.setReference(dom)
						setIsOpen(true)
					} else {
						setIsOpen(false)
					}
				} else {
					setIsOpen(false)
				}
			})
		})
	}, [editor, refs])

	if (!isOpen) return null
	return (
		<div
			ref={refs.setFloating}
			style={floatingStyles}
			className="z-50 w-64 rounded-lg border border-zinc-700 bg-zinc-800 text-white shadow-xl overflow-hidden"
		>
			{filteredUsers.map((user) => (
				<div
					key={user.id}
					className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-700 cursor-pointer transition-colors"
					onClick={() => {
						editor.dispatchCommand(INSERT_MENTION_COMMAND, user)
						setIsOpen(false)
					}}
				>
					<div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold uppercase text-sm">
						{user.username[0]}
					</div>
					<div className="flex flex-col">
						<span className="font-semibold text-sm">@{user.username}</span>
						<span className="text-xs text-zinc-400">ID: {user.id}</span>
					</div>
				</div>
			))}
		</div>
	)
}

export default MentionPlugin
