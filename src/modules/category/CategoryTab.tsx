// CategoryTab.tsx
'use client';

import {
  ChevronDown,
  ChevronRight,
  Plus,
  Settings
} from 'lucide-react';
import { useState } from 'react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

import { useModal } from '@/app/providers/ModalProvider';
import { CategoryType, ModalOpenType } from '@/types';
import { useCategoryChannels } from '@/hooks/useCateogryChannels';
import ChannelTab from '../channel/ChannelTab';
import EditCategoryModal from './mnf/EditCategoryModal';
import { CreateChannelModal } from '../channel/CreateChannelModal';

const CategoryTab = ({ category }:{category: CategoryType}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);
  const { setOpen, setFrom, setCategoryData } = useModal();
  const { data: channels } = useCategoryChannels(category.id);
  const isSystemCategory = category.name.toLowerCase() === 'system';

  const openEditModal = () => {
    setCategoryData(category); // Pass data globally
    setOpen(ModalOpenType.EDIT_CATEGORY);
  };

  if (isSystemCategory) {
    return (
      <div className="mt-2 px-2 space-y-[2px]">
        {category.channels?.map((channel) => (
          <ChannelTab
            key={channel.id}
            channel={channel}
            isActive={channel.id === activeChannelId}
            onClick={() => setActiveChannelId(channel.id)}
          />
        ))}
      </div>
    );
  }

  // console.log('Category', category)
  return (
    <div>
      <Collapsible
        className="mt-2 px-2 group"
        open={isExpanded}
        onOpenChange={setIsExpanded}
      >
        <div className="flex items-center justify-between group">
          <CollapsibleTrigger className="flex items-center gap-1 py-1 text-sm font-semibold text-muted-foreground hover:text-foreground w-full">
            {isExpanded ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
            <span>{category.name}</span>
          </CollapsibleTrigger>

          <div className="flex items-center ml-auto space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="size-5"
                      >
                        <Settings className="size-5 text-muted-foreground hover:text-foreground" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40">
                      <DropdownMenuItem onClick={() => {
                        setCategoryData(category);
                        setOpen(ModalOpenType.EDIT_CATEGORY);
                      }}>
                        Edit Category
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        Copy Category ID
                        <span className='text-xs'>
                        {category.id}
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="text-xs">Edit Category</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Create Channel Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="size-5"
                    onClick={() => {
                      // alert('Create channel')
                      setFrom("category")
                      setOpen(ModalOpenType.CREATE_CHANNEL)
                      setCategoryData(category);
                    }}
                  >
                    <Plus className="size-5 text-muted-foreground hover:text-foreground" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="text-xs">Create Channel</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <CreateChannelModal  />
          </div>
        </div>


        <CollapsibleContent className="space-y-0.5 mt-1">
          {category.channels?.map((channel) => {
            console.log('channel', channel)
            return (
              <ChannelTab
              key={channel.id}
              channel={channel}
              isActive={channel.id === activeChannelId}
              onClick={() => setActiveChannelId(channel.id)}
            />
            )
          })}
        </CollapsibleContent>
      </Collapsible>
      <EditCategoryModal/>
    </div>
  );
};

export default CategoryTab;
