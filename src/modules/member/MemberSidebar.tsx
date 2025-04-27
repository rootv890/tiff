'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { GoHorizontalRule } from "react-icons/go";



const MemberSidebar = (
  { serverId }: { serverId: string }
) => {

 const [members, setMembers] = useState<MemberType[]>([])
 const [owners , setOwners] = useState<MemberType[]>([])
 const [moderators , setModerators] = useState<MemberType[]>([])
//  const [banned , setBanned] = useState<User[]>([])
  const { server } = useServer()

  useEffect(() => {
    if (!server) return;
    const all = server.members
    console.log("ALL members", all)
    const serverMembers =  all.filter((member: MemberType) => member.role === "member")
    setMembers(serverMembers)
    const serverOwners =  all.filter((member: MemberType) => member.role === "owner")
    setOwners(serverOwners)
    const serverModerators =  all.filter((member: MemberType) => member.role === "admin")
    setModerators(serverModerators)
  }, [server])

  return (
      <Sidebar side="right" collapsible="offcanvas" className="border-border !p-0">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="flex gap-1 font-semibold text-[14px]">
                Owner  <GoHorizontalRule/>
                <div className="text-muted-foreground font-medium">
                  {owners.length}
                </div>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              {owners.map((owner) => (
                <MemberButton key={owner.id} member={owner} />
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel className="flex gap-1 font-semibold text-[14px]">
                Moderators  <GoHorizontalRule/>
                <div className="text-muted-foreground font-medium">
                  {moderators.length}
                </div>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              {moderators.map((moderator) => (
                <MemberButton key={moderator.id} member={moderator} />
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel className="flex gap-1 font-semibold text-[14px]">
                Members  <GoHorizontalRule/>
                <div className="text-muted-foreground font-medium">
                  {members.length}
                </div>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              {members.map((member) => (
                <MemberButton key={member.id} member={member} />
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
  )
}
export default MemberSidebar

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useServer } from "@/hooks/useServer";
import { useEffect, useState } from "react";
import { MemberType } from "@/types";
// Adjust if your User type is elsewhere

export const MemberButton = ({ member }: { member:  MemberType}) => {
  return (
    <button className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md hover:bg-card/70 transition">
      <Avatar className="size-7">
        <AvatarImage src={member.user.image || "/default-avatar.png"} alt={member.user.name} />
        <AvatarFallback>
          {member.user.username.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium truncate">{member.user.name}</span>
    </button>
  );
};
