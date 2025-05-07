import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getSelection, $isRangeSelection } from "lexical"
import { useEffect, useRef, useState } from "react"
import MentionNode from "../nodes/MentionNode"
const FAKE_USERS = [
	{ id: "1", name: "alex" },
	{ id: "2", name: "john" },
	{ id: "3", name: "jane" },
	{
		id: "4",
		name: "Yuya",
	},
	{
		id: "5",
		name: "T14X",
	},
]

export function MentionPlugin() {
	const [editor] = useLexicalComposerContext()

	const [isMentioning, setIsMentioning] = useState(false)
	const [query, setQuery] = useState("")
	const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })
	const containerRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		return editor.registerUpdateListener(({ editorState }) => {
			editorState.read(() => {
				const selection = $getSelection()

				if ($isRangeSelection(selection)) {
					const anchorNode = selection.anchor.getNode()
					const text = anchorNode.getTextContent()
					const textBefore = text.slice(0, selection.anchor.offset)
					const match = textBefore.match(/@(\w*)$/) // match "@john"

					if (match) {
						const query = match[1] // "john"
						setQuery(query)

						const domElem = editor.getElementByKey(selection.anchor.key)
						if (domElem) {
							const domRect = domElem.getBoundingClientRect()
							setDropdownPosition({
								top: domRect.bottom + 5,
								left: domRect.left,
							})
							setIsMentioning(true)
						}
					} else {
						// no match, close dropdown
						setIsMentioning(false)
						setQuery("")
					}
				}
			})
		})
	}, [editor])

	const insertMention = (name: string) => {
		editor.update(() => {
			const selection = $getSelection()
			if (selection) {
				const mentionNode = new MentionNode(name)
				selection.insertNodes([mentionNode])
			}
		})

		setIsMentioning(false)
		setQuery("")
	}

	const filteredUsers = FAKE_USERS.filter((u) =>
		u.name.toLowerCase().includes(query.toLowerCase())
	)

	return isMentioning && filteredUsers.length > 0 ?
			<DropdownMenu open>
				{/* Dummy trigger for structure — not visible */}
				<DropdownMenuTrigger asChild>
					<div style={{ display: "none" }} />
				</DropdownMenuTrigger>

				<DropdownMenuContent
					side="bottom"
					align="start"
					style={{
						position: "absolute",
						top: dropdownPosition.top,
						left: dropdownPosition.left,
						zIndex: 100,
					}}
					className="p-1"
				>
					{filteredUsers.map((user) => (
						<DropdownMenuItem
							key={user.id}
							onSelect={() => insertMention(user.name)}
							className="cursor-pointer"
						>
							@{user.name}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		:	null
}
