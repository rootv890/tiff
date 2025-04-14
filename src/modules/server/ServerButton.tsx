import Tooltip from '@/components/tiffui/ToolTip'
import { selectServerSchema } from '@/db/schema'
import Image from 'next/image'
import { z } from 'zod'

type ServerButtonProps = {
    serverData: z.infer<typeof selectServerSchema>
}

const ServerButton = ({ serverData }: ServerButtonProps) => {
    return (
        <button className="w-[48px] mx-auto aspect-square bg-muted rounded-xl hover:rounded-full transition-all overflow-hidden duration-300 ease-in-out">
            <Tooltip content={serverData.name}>
                <Image
                    src={serverData.avatar ?? '/logo.svg'}
                    alt={serverData.name}
                    width={36}
                    height={36}
                    className="rounded-2xl object-cover w-full h-full"
                />
            </Tooltip>
        </button>
    )
}

export default ServerButton
