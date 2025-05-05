import {
    Tooltip as TooltipComponent,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

const Tooltip = ({
    children,
    content,
    side = 'right',
}: {
    children: React.ReactNode
    content: string
    side?: 'top' | 'right' | 'bottom' | 'left'
}) => {
    return (
        <TooltipProvider>
            <TooltipComponent>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent
                    side={side}
                    className=" text-white text-base font-medium"
                >
                    {content}
                </TooltipContent>
            </TooltipComponent>
        </TooltipProvider>
    )
}

export default Tooltip
