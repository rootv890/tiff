
import { cn } from "@/lib/utils";
import { ChannelEnum } from "@/types";
import { Hash, Megaphone, Video, Volume2 } from "lucide-react";
export const GetChannelIcon = ({ channelType, className }: { channelType:
    ChannelEnum
    className?: string
 }) => {
    switch (channelType) {
        case ChannelEnum.TEXT:
            return <Hash className={cn("h-4 w-4", className)} />;
        case ChannelEnum.VOICE:
            return <Volume2 className={cn("h-4 w-4", className)} />;
        case ChannelEnum.ANNOUNCEMENT:
            return <Megaphone className={cn("h-4 w-4", className)} />;
        case ChannelEnum.VIDEO:
            return <Video className={cn("h-4 w-4", className)} />;
    }
};
