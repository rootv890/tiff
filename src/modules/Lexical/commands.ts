import { createCommand } from "lexical"
export const INSERT_TEXT_COMMAND = createCommand<string>("INSERT_TEXT_COMMAND")

// GIF COMMANDS
export interface GIF_PAYLOAD {
	src: string
	alt: string
}

export const INSERT_GIF_COMMAND =
	createCommand<GIF_PAYLOAD>("INSERT_GIF_COMMAND")
