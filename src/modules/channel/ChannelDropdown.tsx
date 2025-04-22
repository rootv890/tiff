'use client';

import { CategoryChannelType } from "@/types";
import {
  Settings,
  Bell,
  BellOff,
  Pencil,
  LucideShield,
  UsersRound,
  Trash2,
  Volume2,
  Hash,
  MessageSquare,
  Megaphone
} from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface ChannelDropdownProps {
  channel: CategoryChannelType;
  onEditChannel?: () => void;
  onDeleteChannel?: () => void;
  children?: React.ReactNode;
}

export function ChannelDropdown({
  channel,
  onEditChannel,
  onDeleteChannel,
  children
}: ChannelDropdownProps) {
  // Helper function to get icon based on channel type
  const getChannelIcon = (type?: string) => {
    switch (type) {
      case "TEXT":
        return <Hash className="mr-2 h-4 w-4" />;
      case "VOICE":
        return <Volume2 className="mr-2 h-4 w-4" />;
      case "ANNOUNCEMENT":
        return <Megaphone className="mr-2 h-4 w-4" />;
      default:
        return <MessageSquare className="mr-2 h-4 w-4" />;
    }
  };

  const handleEditChannel = () => {
    if (onEditChannel) {
      onEditChannel();
    } else {
      toast.warning('Edit functionality not implemented yet', {
        description: "This feature will be available in the next update."
      });
    }
  };

  const handleDeleteChannel = () => {
    if (onDeleteChannel) {
      onDeleteChannel();
    } else {
      toast.warning('Delete functionality not implemented yet', {
        description: "This feature will be available in the next update."
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children || (
          <button className="h-6 w-6 rounded-sm p-1 hover:bg-accent/80">
            <Settings className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 rounded-xl backdrop-blur-2xl" side="right" align="start">
        <DropdownMenuLabel className="flex items-center gap-2 px-3 py-2 text-xs">
          {getChannelIcon(channel.type)}
          <span className="font-semibold">{channel.name || `Channel ${channel.position}`}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {/* Edit Channel */}
          <DropdownMenuItem onClick={onEditChannel}>
            <Pencil className="mr-2 h-4 w-4" />
            <span>Edit Channel</span>
          </DropdownMenuItem>

          {/* Channel Permissions */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <LucideShield className="mr-2 h-4 w-4" />
              <span>Permissions</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-48 rounded-xl bg-accent border-border">
                <DropdownMenuItem>
                  <UsersRound className="mr-2 h-4 w-4" />
                  <span>Role Permissions</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LucideShield className="mr-2 h-4 w-4" />
                  <span>User Permissions</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {/* Channel Notification Settings */}
          <DropdownMenuItem>
            <Bell className="mr-2 h-4 w-4" />
            <span>All Messages</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BellOff className="mr-2 h-4 w-4" />
            <span>Mute Channel</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Delete Channel */}
        <DropdownMenuItem variant="destructive" onClick={handleDeleteChannel}>
          <Trash2 className="mr-2 h-4 w-4 text-red-500" />
          <span className="text-red-500">Delete Channel</span>
        </DropdownMenuItem>

        {/* Show "Coming Soon" badge for features that are in development */}
        <div className="px-3 py-2">
          <Badge variant="outline" className="text-xs w-full justify-center">
            Some features coming in v2.0
          </Badge>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ChannelDropdown;