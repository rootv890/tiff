
import { ChannelType } from "@/types";
import { Hash, Megaphone, Video, Volume2 } from "lucide-react";
export const GetChannelIcon = ({ channelType }: { channelType: ChannelType }) => {
    switch (channelType) {
        case ChannelType.TEXT:
            return <Hash className="h-4 w-4" />;
        case ChannelType.VOICE:
            return <Volume2 className="h-4 w-4" />;
        case ChannelType.ANNOUNCEMENT:
            return <Megaphone className="h-4 w-4" />;
        case ChannelType.VIDEO:
            return <Video className="h-4 w-4" />;
    }
};
