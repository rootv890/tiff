/**
 * 1. Mention Node Setup
 * 2. Trigger @ detection
 * 3. Show Dropdown and select
 * 4. Insert Mention Node
 */
import { DecoratorNode, EditorConfig, LexicalEditor } from "lexical"
import * as React from "react"

type MentionProps = {
	id: string
	name: string
}

export default class MentionNode extends DecoratorNode<React.JSX.Element> {
	__name: string

	static getType() {
		return "mention"
	}

	static clone(node: MentionNode) {
		return new MentionNode(node.__name, node.__key)
	}

	constructor(name: string, key?: string) {
		super(key)
		this.__name = name
	}

	createDOM() {
		const span = document.createElement("span")
		span.className =
			"bg-blue-100 text-blue-700 px-1 rounded font-semibold text-sm"
		span.textContent = `@${this.__name}`
		return span
	}

	updateDOM() {
		return false
	}

	// ✅ Make sure it's inline
	isInline() {
		return true
	}

	// Optional: Prevent editing/deleting just the mention name
	isTextEntity() {
		return true
	}

	// Optional: Let it be selected as a whole
	canBeEmpty() {
		return false
	}

	static importJSON(serializedNode: any) {
		return new MentionNode(serializedNode.name)
	}

	exportJSON() {
		return {
			type: "mention",
			version: 1,
			name: this.__name,
		}
	}

	decorate() {
		return null
	}
}

function MentionComponent(props: MentionProps) {
	return <div>@{props.name}</div>
}
