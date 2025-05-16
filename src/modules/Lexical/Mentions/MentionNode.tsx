import { User } from "@/auth/auth"
import { cn } from "@/lib/utils"
import {
	DecoratorNode,
	EditorConfig,
	SerializedLexicalNode,
	Spread,
} from "lexical"
import { JSX } from "react"

// Simple component for rendering the mention
type MentionProps = Pick<User, "id" | "username"> & {
	className?: string
}
const CSS = {
	mention: cn(
		"bg-primary/40 text-primary rounded-lg p-1 font-medium",
		"hover:bg-primary hover:text-white transition-colors hover:cursor-pointer"
	),
}

// ------------------- Mention component -------------------
function MentionComponent({ username, className }: MentionProps) {
	return (
		<span
			onClick={() => console.log(username)}
			className={cn(CSS.mention, "cursor-pointer", className)}
		>
			@{username}
		</span>
	)
}

// ------------------- SerializedMentionNode -------------------
type SerializedMentionNode = Spread<
	{
		id: string
		username: string
	},
	SerializedLexicalNode
>

export class MentionNode extends DecoratorNode<JSX.Element> {
	__userId: string
	__username: string

	static getType(): string {
		return "mention"
	}

	static clone(node: MentionNode): MentionNode {
		return new MentionNode(node.__userId, node.__username, node.__key)
	}

	constructor(userId: string, username: string, key?: string) {
		super(key)
		this.__userId = userId
		this.__username = username
	}

	// ————— Required for DecoratorNode —————
	createDOM(config: EditorConfig): HTMLElement {
		const span = document.createElement("span")
		// Optional: add a classname for debugging
		span.className = "mention-anchor"
		return span
	}

	updateDOM(
		prevNode: MentionNode,
		dom: HTMLElement,
		config: EditorConfig
	): boolean {
		// return true if you want Lexical to re-run decorate() after props change
		return false
	}

	// This is where your React component gets mounted
	decorate(): JSX.Element {
		return (
			<MentionComponent
				id={this.__userId}
				username={this.__username}
			/>
		)
	}
	// ————————————————————————————————
	/*
	 * Inline nodes are not merged with other nodes when the editor is updated.
	 */
	isInline(): boolean {
		return true
	}

	/*
	 * Isolated nodes are not merged with other nodes when the editor is updated.
	 */
	isIsolated(): boolean {
		return false
	}

	/*
	 *  Import a serialized node
	 */
	static importJSON(json: SerializedMentionNode): MentionNode {
		return new MentionNode(json.id, json.username)
	}

	/*
	 * Export a serialized node
	 */
	exportJSON(): SerializedMentionNode {
		return {
			id: this.__userId,
			username: this.__username,
			type: "mention",
			version: 1,
		}
	}
}
