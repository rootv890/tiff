
import { ChannelEnum } from "@/types";
import { Hash, Megaphone, Video, Volume2 } from "lucide-react";
export const GetChannelIcon = ({ channelType }: { channelType:
    ChannelEnum
 }) => {
    switch (channelType) {
        case ChannelEnum.TEXT:
            return <Hash className="h-4 w-4" />;
        case ChannelEnum.VOICE:
            return <Volume2 className="h-4 w-4" />;
        case ChannelEnum.ANNOUNCEMENT:
            return <Megaphone className="h-4 w-4" />;
        case ChannelEnum.VIDEO:
            return <Video className="h-4 w-4" />;
    }
};
