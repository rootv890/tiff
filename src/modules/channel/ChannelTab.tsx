'use client';

import { cn } from "@/lib/utils";
import { CategoryChannelType, ChannelSchema, ChannelType } from "@/types";

import ChannelDropdown from "./ChannelDropdown";
import { GetChannelIcon } from "@/components/GetChannelIcon";

interface ChannelTabProps {
  channel: ChannelSchema;
  isActive: boolean;
  onClick: () => void;
}

const ChannelTab = ({ channel, isActive, onClick }: ChannelTabProps) => {
  return (
    <div className="relative group/channel">
      <button
        onClick={onClick}
        className={cn(
          "flex w-full items-center gap-x-2 rounded-md px-2 py-1.5 transition-colors",
          isActive ? "bg-accent text-primary" : "text-zinc-400 hover:bg-accent/50 hover:text-zinc-200"
        )}
      >
        <GetChannelIcon channelType={channel.type!} />
        <p className={cn(
          "line-clamp-1 font-medium text-sm transition-colors",
          isActive ? "text-primary" : "group-hover/channel:text-zinc-300"
        )}>
          {channel.name}
        </p>
      </button>

      <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/channel:opacity-100 transition-opacity">
        <ChannelDropdown
          channel={channel}
          onEditChannel={() => console.log('Edit channel', channel.id)}
          onDeleteChannel={() => console.log('Delete channel', channel.id)}
        />
      </div>
    </div>
  );
};

export default ChannelTab;
