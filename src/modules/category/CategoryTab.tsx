'use client';

import { CategoryType } from "@/types";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ChannelTab from "../channel/ChannelTab";
import { getServerCategories } from "@/actions/server/queries";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/queryKeys";
import { useUser } from "@/hooks/useUser";

interface CategoryTabProps {
  category: CategoryType;
}




function useCategoryChannels(categoryId: string) {
  const { user } = useUser();
  return useQuery({
    queryKey: [QUERY_KEYS.CHANNELS, categoryId],
    queryFn: () => getServerCategories(categoryId, user?.id || ""),
    enabled: !!user?.id,
  });
}

const CategoryTab = ({ category }: CategoryTabProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);
  const { data: channels, isLoading, error } = useCategoryChannels(category.id);

  // Check if this is a system category - typically named "System" or has a specific id pattern
  const isSystemCategory = category.name.toLowerCase() === "system";

  // Render channels directly without category heading for system channels
  if (isSystemCategory) {
    return (
      <div className="mt-2 px-2 space-y-[2px]">
        {category.channels && category.channels.map((channel) => {
          const isActive = channel.id === activeChannelId;

          return (
            <ChannelTab
              key={channel.id}
              channel={channel}
              isActive={isActive}
              onClick={() => setActiveChannelId(channel.id)}
            />
          );
        })}
      </div>
    );
  }

  // Regular category with collapsible header
  return (
    <Collapsible
      defaultOpen
      className="mt-2 px-2"
      open={isExpanded}
      onOpenChange={setIsExpanded}
    >
      <div className="flex items-center justify-between group">
        <CollapsibleTrigger className="flex items-center gap-1 py-[5px] text-sm font-semibold  text-muted-foreground group-hover:text-foreground w-full">
          <div className="flex items-center gap-1">
            {isExpanded ?
              <ChevronDown className="size-4 transition-transform duration-200" /> :
              <ChevronRight className="size-4 transition-transform duration-200" />
            }
            <span>{category.name}</span>
          </div>
        </CollapsibleTrigger>

        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <button className="size-5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
                <Plus className="size-5 text-muted-foreground hover:text-foreground" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" align="center">
              <p className="text-xs">Create Channel</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <CollapsibleContent className="space-y-0.5 mt-1">
        <div className="space-y-[2px]">
          {channels && channels.length > 0 && channels.map((channel) => {
            const isActive = channel.id === activeChannelId;

            return (
              <ChannelTab
                key={channel.id}
                channel={channel}
                isActive={isActive}
                onClick={() => setActiveChannelId(channel.id)}
              />
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CategoryTab;
