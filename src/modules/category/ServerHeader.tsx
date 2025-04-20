'use client'

import { ServerType } from "@/types"
import { Skeleton } from "@radix-ui/themes"
import { ChevronDown, FolderPlus, MessageSquarePlus, LogOut, Trash2, Rocket, Bell, EyeOff, XIcon, Settings } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ServerBanner } from "./ServerBanner"
import { useState } from "react"
import { toast } from "sonner"
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface ServerHeaderProps {
  serverData: ServerType
}



const ServerHeader = (
  {serverData}:ServerHeaderProps
) => {
  if (!serverData) return <ServerHeaderSkeleton/>

  const [open, setOpen] = useState(false)

  return (
    <div className="w-[calc(100%+1rem)] relative -m-2">
    {/* Banner background - absolute positioned */}
    <ServerBanner banner={serverData.banner} />
    <div className="hover:bg-card/20 hover:backdrop-blur-xl h-14 flex px-4 items-center justify-between relative z-10"
      onClick={() => setOpen(!open)}
    >
      {/* title of the server */}
      <div>
        <h3 className="font-semibold text-lg">
          {serverData.name}
        </h3>
      </div>
      <div>
        <ServerDropdown open={open} setOpen={setOpen}/>
      </div>

    </div>
    </div>
  )
}
export default ServerHeader



export function ServerDropdown(
  {open, setOpen}: {open?: boolean, setOpen?: (open: boolean) => void}
) {
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button>
          {
            !open ? <ChevronDown/> : <XIcon/>
          }
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent  className="w-58  rounded-xl backdrop-blur-2xl" sticky="partial" side="bottom" align="end">
        <DropdownMenuGroup>
          {/* Create new category option */}
          <DropdownMenuItem>
            <FolderPlus className="mr-2 h-4 w-4" />
            <span>New Category</span>
          </DropdownMenuItem>

          {/* Create new channel option */}
          <DropdownMenuItem>
            <MessageSquarePlus className="mr-2 h-4 w-4" />
            <span>New Channel</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          {/* Server Settings */}
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Server Settings</span>
          </DropdownMenuItem>

          {/* Server boost option */}
          <DropdownMenuItem>
            <Rocket className="mr-2 h-4 w-4 text-pink-500" />
            <span>Server Boost</span>
            <Badge  className="text-muted-foreground text-xs" variant="secondary">
                for v2.0
              </Badge>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Mute server option */}
          <DropdownMenuItem>
            <Bell className="mr-2 h-4 w-4" />
            <span>Mute Server</span>
            <Badge  className="text-muted-foreground text-xs" variant="secondary">
                for v2.0
              </Badge>
          </DropdownMenuItem>

          {/* Hide server option */}
          <DropdownMenuItem onClick={()=>{
            toast.warning('This feature is not available yet',{
              description:"Expect in version banana i.e, 2.0"
            })
          }}>
            <EyeOff className="mr-2 h-4 w-4" />
            <span>Hide Server</span>

              <Badge  className="text-muted-foreground text-xs" variant="secondary">
                for v2.0
              </Badge>

          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Leave server option */}
          <DropdownMenuItem variant="destructive">
            <LogOut className="mr-2 h-4 w-4 text-amber-500" />
            <span>Leave Server</span>
          </DropdownMenuItem>

          {/* Delete server option */}
          <DropdownMenuItem variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete Server</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


/**
 * Skeleton Banner Component
 * Displays a placeholder gradient when loading
 */
export function SkeletonBanner() {
  return (
    <div className="absolute top-0 left-0 w-full h-32 overflow-hidden z-0">
      <div className="w-full h-full bg-gradient-to-br from-muted/30 to-muted/50" />
      {/* Overlay gradient for text readability */}
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-card/80 to-transparent" />
    </div>
  );
}

export function ServerHeaderSkeleton() {
  return (
    <div className="w-[calc(100%+1rem)] relative -m-2">
      {/* Banner background - absolute positioned with skeleton effect */}
      <SkeletonBanner />
      <div className="bg-card/50 backdrop-blur-sm h-14 flex px-4 items-center justify-between relative z-10">
        {/* title of the server */}
        <div>
          <h3 className="font-semibold text-lg">
            <Skeleton className="w-32 h-4"/>
          </h3>
        </div>
        <div>
          <ServerDropdown/>
        </div>
      </div>
    </div>
  )
}