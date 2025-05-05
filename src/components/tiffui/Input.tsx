import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({
    className,
    type,
    maxLength = 46,
    ...props
}: React.ComponentProps<'input'>) {
    return (
        <input
            type={type}
            data-slot="input"
            maxLength={maxLength}
            className={cn(
                'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input-border flex h-[44px] w-full min-w-0 rounded-xl border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm -tracking-normal ',
                'focus-visible:border-info  text-foreground focus-visible:ring-info focus-visible:ring-[1px]',
                'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                'placeholder:text-muted-foreground placeholder:font-medium',
                className
            )}
            {...props}
        />
    )
}

export { Input }
