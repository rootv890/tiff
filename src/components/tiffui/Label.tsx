import { cn } from '@/lib/utils'
import { Label as RadixLabel } from 'radix-ui'
import React from 'react'

export const Label = React.forwardRef<
    HTMLLabelElement,
    React.LabelHTMLAttributes<HTMLLabelElement>
>((props, ref) => {
    const { children, className, ...rest } = props
    return (
        <RadixLabel.Root
            {...rest}
            ref={ref}
            className={cn(
                'flex items-center gap-2 text-[16px]  text-muted-foreground leading-none  tracking-wide font-[500] select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
                className
            )}
        >
            {children}
        </RadixLabel.Root>
    )
})
Label.displayName = 'Label'
