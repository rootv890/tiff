'use client';

import { cn } from "@/lib/utils";
import { CategoryChannelType } from "@/types";
import { Hash, Megaphone, Volume2 } from "lucide-react";
import ChannelDropdown from "./ChannelDropdown";

interface ChannelTabProps {
  channel: CategoryChannelType;
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
        {channel.type === "TEXT" ? (
          <Hash className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
        ) : (
          <Volume2 className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
        )}
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
