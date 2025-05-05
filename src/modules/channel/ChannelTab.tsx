'use client';

import { cn } from "@/lib/utils";
import {   ChannelType, ChannelEnum } from "@/types";

import ChannelDropdown from "./ChannelDropdown";
import { GetChannelIcon } from "@/components/GetChannelIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface ChannelTabProps {
  channel: ChannelType;
  isActive: boolean;
  onClick: () => void;
}

const ChannelTab = ({ channel, isActive, onClick }: ChannelTabProps) => {
  const pathname = usePathname();
  const isActiveChannel  =  pathname.includes(`/servers/${channel.serverId}/${channel.id}`);
  return (
    <Link href={`/servers/${channel.serverId}/${channel.id}`} className="relative group/channel">
      <button
        onClick={onClick}
        className={cn(
          "flex w-full items-center gap-x-2 rounded-md px-2 py-1.5 transition-colors",
         isActiveChannel ? "bg-accent text-foreground " : "text-zinc-400 hover:bg-accent/50 hover:text-zinc-200"
        )}
      >
        <GetChannelIcon channelType={channel.type as ChannelEnum} />
        <p className={cn(
          "line-clamp-1 font-medium text-[14px] transition-colors",
        )}>
          {channel.name}
        </p>
      </button>

      <div className={cn(
        "absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/channel:opacity-100 transition-opacity",
        isActiveChannel ? "opacity-100" : "opacity-0"
      )}>
        <ChannelDropdown
          channel={channel}
          onEditChannel={() => console.log('Edit channel', channel.id)}
          onDeleteChannel={() => console.log('Delete channel', channel.id)}
        />
      </div>
    </Link>
  );
};

export default ChannelTab;
