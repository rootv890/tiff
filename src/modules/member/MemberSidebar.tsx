

'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { GoHorizontalRule } from "react-icons/go";
import { MemberButton } from "./MemberTab";
import { useEffect, useState } from "react";
import { MemberType } from "@/types";
import { useServer } from "@/hooks/useServer";



const MemberSidebar = () => {

 const [members, setMembers] = useState<MemberType[]>([])
 const [owners , setOwners] = useState<MemberType[]>([])
 const [moderators , setModerators] = useState<MemberType[]>([])
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
      <Sidebar side="right" collapsible="offcanvas"
         inert
      className="border-border !p-0" >
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
