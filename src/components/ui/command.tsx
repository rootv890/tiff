"use client"

import { Command as CommandPrimitive } from "cmdk"

import * as React from "react"

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { DialogOverlay } from "@radix-ui/react-dialog"

function Command({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive>) {
	return (
		<CommandPrimitive
			data-slot="command"
			className={cn(
				"flex h-full  bg w-full flex-col overflow-hidden  bg-secondary text-secondary-foreground",
				className
			)}
			{...props}
		/>
	)
}

function CommandDialog({
	title = "Command Palette",
	description = "Search for a command to run...",
	children,
	...props
}: React.ComponentProps<typeof Dialog> & {
	title?: string
	description?: string
}) {
	return (
		<Dialog {...props}>
			<DialogOverlay
				className="fixed inset-0  z-40 bg-black/70"
				aria-hidden="true"
			/>
			<DialogHeader className="sr-only">
				<DialogTitle>{title}</DialogTitle>
				<DialogDescription>{description}</DialogDescription>
			</DialogHeader>
			<DialogContent className="bg-transparent border-none flex flex-col items-center justify-start origin-top gap-2 mt-20">
				<p className="text-xl font-semibold">{title}</p>
				<div className="z-50 overflow-hidden rounded-2xl p-4 shadow-xl border border-border bg-secondary text-secondary-foreground w-full max-w-xl">
					<Command className="text-base">{children}</Command>
				</div>
			</DialogContent>
		</Dialog>
	)
}

function CommandInput({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
	return (
		<div
			data-slot="command-input-wrapper"
			className="flex h-16 items-center gap-2 border rounded-xl border-border px-4"
		>
			<CommandPrimitive.Input
				data-slot="command-input"
				className={cn(
					"flex h-10 w-full bg-transparent py-2 text-xl placeholder:text-secondary-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50",
					className
				)}
				{...props}
			/>
		</div>
	)
}

function CommandList({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
	return (
		<CommandPrimitive.List
			data-slot="command-list"
			className={cn(
				"max-h-[300px] overflow-y-auto scroll-py-1 px-2 py-3 space-y-1 bg-secondary text-secondary-foreground scrollbar mask-b-from-80% mask-b-to-100% mask-t-from-80% mask-t-to-100% mb-6",
				className
			)}
			{...props}
		/>
	)
}

function CommandEmpty({
	...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
	return (
		<CommandPrimitive.Empty
			data-slot="command-empty"
			className="py-6 text-center text-xl text-secondary-foreground"
			{...props}
		/>
	)
}

function CommandGroup({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
	return (
		<CommandPrimitive.Group
			data-slot="command-group"
			className={cn(
				"overflow-hidden px-2 text-white [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-[#929292] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:py-1.5",
				className
			)}
			{...props}
		/>
	)
}

function CommandSeparator({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
	return (
		<CommandPrimitive.Separator
			data-slot="command-separator"
			className={cn("h-px bg-border my-1", className)}
			{...props}
		/>
	)
}

function CommandItem({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
	return (
		<CommandPrimitive.Item
			data-slot="command-item"
			className={cn(
				"relative flex cursor-default select-none items-center gap-2 rounded-md px-3 py-2 text-base transition-colors data-[selected=true]:bg-active data-[selected=true]:text-active-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
				className
			)}
			{...props}
		></CommandPrimitive.Item>
	)
}

function CommandShortcut({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="command-shortcut"
			className={cn(
				"ml-auto text-xs tracking-widest text-secondary-foreground",
				className
			)}
			{...props}
		/>
	)
}

export {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
}
