import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { BsPersonPlusFill } from "react-icons/bs";
import { ChevronDown, FolderPlus, MessageSquarePlus, LogOut, Trash2, Rocket, Bell, EyeOff, XIcon, Settings } from "lucide-react"

import { toast } from "sonner"
import { useModal } from "@/app/providers/ModalProvider"
import { ModalOpenType } from "@/types"

export function ServerDropdown(
  {dropDownOpen, setDropDownOpen}: {dropDownOpen?: boolean, setDropDownOpen?: (open: boolean) => void}
) {
  const { setOpen, setFrom } = useModal()
  return (
    <DropdownMenu open={dropDownOpen} onOpenChange={setDropDownOpen}>
      <DropdownMenuTrigger asChild>
        <button>
          {
            !dropDownOpen ? <ChevronDown/> : <XIcon/>
          }
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent  className="w-58  rounded-xl bg-background/60 backdrop-blur-2xl" sticky="partial" side="bottom" align="end">
        <DropdownMenuGroup>
          {/* Create new category option */}
          <DropdownMenuItem className="bg-background/60 hover:bg-background/40"  onClick={() => setOpen(ModalOpenType.CREATE_CATEGORY)}>
            <FolderPlus className="mr-2 h-4 w-4" />
            <span>New Category</span>
          </DropdownMenuItem>

          {/* Create new channel option */}
          <DropdownMenuItem onClick={
            ()=>{
              setFrom("server")
              setOpen(ModalOpenType.CREATE_CHANNEL)
            }
          }>
            <MessageSquarePlus className="mr-2 h-4 w-4" />
            <span>New Channel</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          {/* Server Settings */}
          <DropdownMenuItem className="bg-background/60 hover:bg-background/40"
            onClick={()=>{
              setOpen(ModalOpenType.INVITE_TO_SERVER)
            }}
          >
            <BsPersonPlusFill className="mr-2 h-4 w-4" />
            <span>Invite People</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="bg-background/60 hover:bg-background/40">
            <Settings className="mr-2 h-4 w-4" />
            <span>Server Settings</span>
          </DropdownMenuItem>

          {/* Server boost option */}
          <DropdownMenuItem className="bg-background/60 hover:bg-background/40" >
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
