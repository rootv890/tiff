'use client'

import { GetChannelIcon } from "@/components/GetChannelIcon"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { useServer } from "@/hooks/useServer"
import { ChannelEnum } from "@/types"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { ServerAvatar } from "../server/ServerAvatar"
import { useRouter } from "next/navigation"
import Link from "next/link"



const SearchInput = () => {
  return (
    <SearchCommand/>
  )
}


export function SearchCommand() {
  const [open, setOpen] = useState(false)
  const { server } =  useServer()
  const router = useRouter()


  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  if (!server) return null
  const categories = server.categories.map((category) => category).flat().filter((category) => category.name.toLowerCase() !== 'system')
  const channels = server.categories.map((category) => category.channels).flat()
  const  members =  server.members


  return (
    <>
      <div
        className="flex items-center h-9 w-full   gap-3 bg-secondary rounded-xl border-0 px-3 py-1 text-sm shadow-sm transition-colors cursor-pointer hover:bg-accent"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center gap-1">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <span className="text-muted-foreground">Search</span>
        </div>
        <div className="ml-auto flex items-center gap-1">
           <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </div>
      <CommandDialog  title="Search for channels, categories or members " open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Categories" color="secondary">
            {categories.map((category) => (
              <CommandItem
              asChild
              key={category.id}>
                <Link href={`/servers/${server?.id}/${
                  category.channels[0]?.id
                }`} onClick={() => setOpen(false)}>
                  <span>{category.name}</span>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Channels">
            {channels.map((channel) => (
              <CommandItem
              asChild
              key={channel.id}>
                <Link href={`/servers/${server?.id}/${channel.id}`} onClick={() => setOpen(false)}>
                <GetChannelIcon
                  className="size-5 text-muted-foreground"
                  channelType={channel.type as ChannelEnum}
                />
                <span>{channel.name}</span>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Members">
            {members.map((member) => (
              <CommandItem key={member.id}>
               <ServerAvatar
                className="size-5 text-muted-foreground"
                name={member.user.name}
                src={member.user.image || ""}
                />
                <span>{member.user.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  )
}


export default SearchInput