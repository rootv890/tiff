import { cn } from "@/lib/utils"
import { Popover as RadixPopover } from "radix-ui"
import React from "react"
// Root
function Popover({ ...props }: React.ComponentProps<typeof RadixPopover.Root>) {
	return (
		<RadixPopover.Root
			// Adds a data attribute for styling and targeting the popover component
			data-slot="popover"
			{...props}
		/>
	)
}

// Trigger
function PopoverTrigger({
	className,
	...props
}: React.ComponentProps<typeof RadixPopover.Trigger>) {
	return (
		<RadixPopover.Trigger
			className={cn(
				className,
				"bg-popover p-2 px-3 border border-border rounded-lg hover:bg-hover cursor-pointer"
			)}
			data-slot="popover-trigger"
			{...props}
		/>
	)
}

// Content
function PopoverContent({
	className,
	align = "start",
	sideOffset = 4,
	...props
}: React.ComponentProps<typeof RadixPopover.Content>) {
	return (
		<RadixPopover.Portal>
			<RadixPopover.Content
				data-slot="popover-content"
				className={cn(
					className,
					"text-popover-foreground bg-popover-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 w-72 origin-(--radix-popover-content-transform-origin) rounded-lg border border-border p-4 shadow-md outline-hidden z-[9999]"
				)}
				align={align}
				sideOffset={sideOffset}
				// onEscapeKeyDown={(e) => {}}
				{...props}
			>
				{props.children}
				<RadixPopover.Close className="absolute top-2 right-2 cursor-pointer fill-white bg-white" />
				<RadixPopover.Arrow />
			</RadixPopover.Content>
		</RadixPopover.Portal>
	)
}

// Anchor
function PopoverAnchor({
	...props
}: React.ComponentProps<typeof RadixPopover.Anchor>) {
	return (
		<RadixPopover.Anchor
			data-slot="popover-anchor"
			{...props}
		/>
	)
}

Popover.displayName = "Popover"
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }

/* Anatomy */
// import { Popover } from "radix-ui";

// export default () => (
// 	<Popover.Root>
// 		<Popover.Trigger />
// 		<Popover.Anchor />
// 		<Popover.Portal>
// 			<Popover.Content>
// 				<Popover.Close />
// 				<Popover.Arrow />
// 			</Popover.Content>
// 		</Popover.Portal>
// 	</Popover.Root>
// );
