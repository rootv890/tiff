import gf from "@/lib/giphy"
import { Grid } from "@giphy/react-components"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
	$createParagraphNode,
	$getRoot,
	$getSelection,
	$isRangeSelection,
	COMMAND_PRIORITY_LOW,
} from "lexical"
import React, { useCallback, useEffect, useRef, useState } from "react"

import { GiFClef } from "react-icons/gi"
import { INSERT_GIF_COMMAND } from "../commands" // Adjusted path
import { $createGifNode, GifNodePayload } from "./GifNode" // Adjusted path

// Debounce utility function
const debounce = <F extends (...args: any[]) => any>(
	func: F,
	waitFor: number
) => {
	let timeoutId: ReturnType<typeof setTimeout> | null = null
	const callable = (...args: Parameters<F>) => {
		if (timeoutId) {
			clearTimeout(timeoutId)
		}
		timeoutId = setTimeout(() => func(...args), waitFor)
	}
	return callable as F
}

export default function GifPicker() {
	const [editor] = useLexicalComposerContext()
	const [showGifPicker, setShowGifPicker] = useState(false)
	const pickerRef = useRef<HTMLDivElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)
	const [searchTerm, setSearchTerm] = useState("trending") // Default to trending
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("trending")
	const searchInputRef = useRef<HTMLInputElement>(null)

	// Debounce the search term update
	const updateDebouncedSearchTerm = useCallback(
		debounce(setDebouncedSearchTerm, 500),
		[]
	)

	useEffect(() => {
		updateDebouncedSearchTerm(searchTerm)
	}, [searchTerm, updateDebouncedSearchTerm])

	// Command to insert GIF node
	useEffect(() => {
		return editor.registerCommand<GifNodePayload>(
			INSERT_GIF_COMMAND,
			(payload) => {
				editor.update(() => {
					const selection = $getSelection()
					const gifNode = $createGifNode(payload)
					const paragraph = $createParagraphNode()
					paragraph.append(gifNode)

					if ($isRangeSelection(selection)) {
						selection.insertNodes([paragraph])
					} else {
						const root = $getRoot()
						root.append(paragraph)
					}
				})
				return true
			},
			COMMAND_PRIORITY_LOW
		)
	}, [editor])

	// Click outside to close
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				pickerRef.current &&
				!pickerRef.current.contains(event.target as Node) &&
				buttonRef.current &&
				!buttonRef.current.contains(event.target as Node)
			) {
				setShowGifPicker(false)
			}
		}
		if (showGifPicker) {
			document.addEventListener("mousedown", handleClickOutside)
			// Focus search input when picker opens
			searchInputRef.current?.focus()
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [showGifPicker])

	const handleGifClick = (
		gif: any,
		e: React.SyntheticEvent<HTMLElement, Event>
	) => {
		e.preventDefault() // Prevent any default behavior

		const payload: GifNodePayload = {
			src: gif.images.original.url,
			altText: gif.title || "Selected GIF", // Use GIF title or a fallback
		}
		editor.dispatchCommand(INSERT_GIF_COMMAND, payload)
		setShowGifPicker(false)
		setSearchTerm("trending") // Reset search to trending for next open
		setDebouncedSearchTerm("trending")

		setTimeout(
			() =>
				editor.focus(() => {
					editor.update(() => {
						const root = $getRoot()
						root.selectEnd()
					})
				}),
			0
		)
	}

	// Memoize fetchGifs function to prevent unnecessary re-renders of Grid
	// The Grid component uses this function as a dependency for its internal state.
	const fetchGifs = useCallback(
		(offset: number) => {
			if (
				debouncedSearchTerm.trim() === "" ||
				debouncedSearchTerm === "trending"
			) {
				return gf.trending({ offset, limit: 12 }) // Fetch 12 trending GIFs
			}
			return gf.search(debouncedSearchTerm, { offset, limit: 12, type: "gifs" }) // Fetch 12 searched GIFs
		},
		[debouncedSearchTerm]
	) // Recreate when debouncedSearchTerm changes

	const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newSearchTerm = e.target.value
		if (newSearchTerm.trim() === "") {
			setSearchTerm("trending") // If input is cleared, show trending
		} else {
			setSearchTerm(newSearchTerm)
		}
	}

	return (
		<div className="w-fit relative">
			{/* <button
				ref={buttonRef}
				onClick={() => setShowGifPicker((prev) => !prev)}
				className="text-sm px-3 py-1.5 rounded-md bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-medium"
				aria-label="Insert GIF"
			>
				GIF
			</button> */}
			<button
				ref={buttonRef}
				onClick={() => setShowGifPicker((prev) => !prev)}
				className="text-sm  font-medium rounded-md  px-1 py-.5 antialiased border-2  hover:bg-secondary-foreground hover:text-secondary transition-colors duration-500 ease-out"
			>
				GIF
			</button>
			{showGifPicker && (
				<div
					ref={pickerRef}
					className="absolute bottom-full mb-2 right-0 z-50 bg-secondary dark:bg-zinc-900 border border-zinc-700 dark:border-zinc-700 shadow-xl dark:shadow-zinc-900/50 rounded-lg p-3 w-80 md:w-96 h-[400px] flex flex-col backdrop-blur-sm bg-opacity-90 dark:bg-opacity-95"
				>
					<input
						ref={searchInputRef}
						type="text"
						placeholder="Search Giphy or view trending..."
						// Control the input value with searchTerm, but allow "trending" to clear it for display
						value={searchTerm === "trending" ? "" : searchTerm}
						onChange={handleSearchInputChange}
						className="w-full p-2.5 mb-3 rounded-lg bg-secondary dark:bg-zinc-800 border border-zinc-700 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
					/>
					<div className="flex-grow overflow-y-auto custom-scrollbar">
						{/* The key prop helps React differentiate Grid instances if search term changes, forcing a re-render/re-fetch */}
						{/* However, relying on fetchGifs changing is often sufficient */}
						<Grid
							backgroundColor="black"
							key={debouncedSearchTerm} // Force re-render of Grid when debounced search term changes
							width={
								pickerRef.current?.clientWidth ?
									pickerRef.current.clientWidth - 30
								:	290
							} // Adjust width based on container
							columns={3} // Adjust number of columns
							gutter={6}
							fetchGifs={fetchGifs}
							onGifClick={handleGifClick}
							noLink={true} // Prevent Giphy links on GIFs if desired
							className="giphy-grid" // Add a class for potential custom styling
							// Consider adding a loading indicator or error display if gf.search or gf.trending throws
						/>
					</div>
				</div>
			)}
		</div>
	)
}
