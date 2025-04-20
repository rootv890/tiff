'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import ServerHeader from "./ServerHeader"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { QUERY_KEYS } from "@/queryKeys"
const CategorySidebar = (
  { serverId }: { serverId: string }
) => {
  // fetch current serverData
  const params =  useParams()
  const serverData = useQuery({
    queryKey: [QUERY_KEYS.SERVER, params.sId],
     // queryFn: () =>
  })
  return (
    <Sidebar variant="sidebar" collapsible="offcanvas" className="translate-x-14
    border-border !p-0" >
      <SidebarHeader >
        <ServerHeader serverData={{
          name: "Server",
          id: serverId,
          description: "Description",
          banner: {
            url: "",
            type: "solid",
            color: "#5865f2",
            gradient: {
              to: "#3d48b9",
              from: "#5865f2",
              angle: 135
            }
          },
          createdAt: new Date(),
          updatedAt: new Date(),
          joinedAt: new Date(),
          ownerId: "ownerId",
          isPublic: null,
          inviteCode: null,
          boostCount: null,
          avatar: "https://res.cloudinary.com/drhdaopqy/image/upload/tiff/assets/fribble@4x_-snL3C"
        }}/>
      </SidebarHeader>
      <SidebarContent  >
        <SidebarTrigger/>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
export default CategorySidebar