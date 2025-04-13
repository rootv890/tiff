import { Checkbox as RadixCheckBox } from "radix-ui"
import React from "react"
import { cn } from "@/lib/utils"
import { RiCheckLine } from "react-icons/ri"
export const Checkbox = ({
	className,
	...props
}: React.ComponentProps<typeof RadixCheckBox.Root>) => {
	return (
		<RadixCheckBox.Root
			defaultChecked={props.defaultChecked}
			className={cn(
				"peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
				className
			)}
			{...props}
		>
			<RadixCheckBox.Indicator
				data-slot="checkbox-indicator"
				className="flex items-center justify-center text-current transition-none"
			>
				<RiCheckLine />
			</RadixCheckBox.Indicator>
		</RadixCheckBox.Root>
	)
}

Checkbox.displayName = "Checkbox"

export default Checkbox
