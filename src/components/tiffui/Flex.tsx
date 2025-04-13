import React from "react"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"
import { cva, VariantProps } from "class-variance-authority"

const flexVariants = cva("flex", {
	variants: {
		inline: {
			true: "inline-flex",
			false: "flex",
		},
		direction: {
			column: "flex-col",
			row: "flex-row",
		},
		justify: {
			start: "justify-start",
			end: "justify-end",
			center: "justify-center",
			between: "justify-between",
			evenly: "justify-evenly",
			round: "justify-around", // fixed to Tailwind class
			stretch: "justify-stretch", // note: not a valid Tailwind class, can remove or custom-extend
		},
		align: {
			start: "items-start",
			end: "items-end",
			center: "items-center",
			between: "items-baseline", // corrected
			evenly: "items-evenly", // not valid in Tailwind — optional
			round: "items-stretch", // corrected
			stretch: "items-stretch",
		},
		wrap: {
			noWrap: "flex-nowrap",
			wrap: "flex-wrap",
			wrapReverse: "flex-wrap-reverse",
		},
		gap: {
			none: "gap-0",
			sm: "gap-1",
			md: "gap-2",
			lg: "gap-3",
			xl: "gap-4",
			"2xl": "gap-5",
			"3xl": "gap-6",
		},
		gapX: {
			none: "gap-x-0",
			sm: "gap-x-1",
			md: "gap-x-2",
			lg: "gap-x-3",
			xl: "gap-x-4",
			"2xl": "gap-x-5",
			"3xl": "gap-x-6",
		},
		gapY: {
			none: "gap-y-0",
			sm: "gap-y-1",
			md: "gap-y-2",
			lg: "gap-y-3",
			xl: "gap-y-4",
			"2xl": "gap-y-5",
			"3xl": "gap-y-6",
		},
		grow: {
			none: "grow-0",
			true: "grow",
		},
		shrink: {
			none: "shrink-0",
			true: "shrink",
		},
		basis: {
			auto: "basis-auto",
			full: "basis-full",
			"1/2": "basis-1/2",
			"1/3": "basis-1/3",
			"2/3": "basis-2/3",
			"1/4": "basis-1/4",
			"3/4": "basis-3/4",
		},
		order: {
			first: "order-first",
			last: "order-last",
			none: "order-none",
			1: "order-1",
			2: "order-2",
			3: "order-3",
			4: "order-4",
			5: "order-5",
		},
		flex: {
			1: "flex-1",
			auto: "flex-auto",
			initial: "flex-initial",
			none: "flex-none",
		},
	},
	defaultVariants: {
		inline: false,
		direction: "row",
		justify: "start",
		align: "center",
		wrap: "noWrap",
		gap: "md",
		gapX: "none",
		gapY: "none",
	},
})

export interface FlexProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof flexVariants> {
	asChild?: boolean
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
	({ className, asChild = false, children, ...props }, ref) => {
		const Comp = asChild ? Slot.Root : "div"
		return (
			<Comp
				ref={ref}
				className={cn(flexVariants(props), className)}
				{...props}
			>
				{children}
			</Comp>
		)
	}
)
Flex.displayName = "Flex"
export default Flex
