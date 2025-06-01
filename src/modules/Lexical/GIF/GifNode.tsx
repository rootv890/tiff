import {
	DecoratorNode,
	DOMConversionMap,
	DOMConversionOutput,
	DOMExportOutput,
	EditorConfig,
	LexicalEditor,
	LexicalNode,
	NodeKey,
	SerializedLexicalNode,
	Spread,
} from "lexical"

import React, { JSX, Suspense } from "react"

const GifComponent = React.lazy(
	// @ts-ignore
	() => import("./GifComponent")
)

export interface GifNodePayload {
	altText: string
	src: string
	key?: NodeKey
}

function convertGifElement(domNode: HTMLElement): DOMConversionOutput | null {
	//
	const img = domNode.querySelector("img")
	if (img !== null) {
		// destructure the alt and src from imgElement
		const { alt, src } = img
		const node = $createGifNode({ altText: alt, src })
		return { node }
	}
	return null
}

export type SerializedGifNode = Spread<
	{ altText: string; src: string },
	SerializedLexicalNode
>

// GIF Node
export class GifNode extends DecoratorNode<JSX.Element> {
	__src: string
	__altText: string

	// getType()
	static getType(): string {
		return "gif"
	}
	// clone()
	static clone(node: GifNode): GifNode {
		return new GifNode(node.__src, node.__altText, node.__key)
	}

	constructor(src: string, altText: string, key?: NodeKey) {
		super(key)
		this.__src = src
		this.__altText = altText
	}

	/**
	 * createDOM() is a required method for all nodes, which tells Lexical how to render this node in the DOM.
	 * @param _config - The editor configuration.
	 * @param _editor - The LexicalEditor instance.
	 */
	createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
		// create a span element
		const span = document.createElement("span")
		// get the theme from the editor config
		const theme = _config.theme
		// get the gif class from the theme
		const className = theme.gif || ""
		// set the class name on the span
		span.className = className
		// return the span
		return span
	}
	// updateDOM()
	updateDOM(
		_prevNode: unknown,
		_dom: HTMLElement,
		_config: EditorConfig
	): boolean {
		return false
	}

	getSrc(): string {
		return this.__src
	}

	getAltText(): string {
		return this.__altText
	}

	decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element {
		return (
			<Suspense fallback={null}>
				<GifComponent
					src={this.__src}
					altText={this.__altText}
					nodeKey={this.__key}
				/>
			</Suspense>
		)
	}

	static importJSON(_serializedNode: SerializedLexicalNode): LexicalNode {
		const { altText, src } = _serializedNode as SerializedGifNode
		const node = $createGifNode({ altText, src })
		return node
	}

	exportJSON(): SerializedGifNode {
		return {
			type: "gif",
			version: 1,
			altText: this.__altText,
			src: this.__src,
		}
	}

	static importDOM?: () => DOMConversionMap<any> | null = () => {
		return {
			span: (domNode: HTMLElement) => {
				if (!domNode.hasAttribute("data-lexical-gif")) return null
				return {
					conversion: convertGifElement,
					priority: 1,
				}
			},
		}
	}

	exportDOM(editor: LexicalEditor): DOMExportOutput {
		const span = document.createElement("span")
		span.setAttribute("data-lexical-gif", "true")
		const img = document.createElement("img")
		img.setAttribute("src", this.__src)
		img.setAttribute("alt", this.__altText)
		img.style.maxWidth = "300px"
		img.style.maxHeight = "200px"
		img.style.borderRadius = "4px"
		span.appendChild(img)
		return {
			element: span,
		}
	}

	isInline(): boolean {
		return false
	}

	static canBeEmpty(): boolean {
		return false
	}
}
export function $createGifNode({ altText, src, key }: GifNodePayload): GifNode {
	return new GifNode(src, altText, key)
}

export function $isGifNode(
	node: LexicalNode | null | undefined
): node is GifNode {
	return node instanceof GifNode
}
