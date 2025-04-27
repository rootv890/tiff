'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import ServerHeader, { ServerHeaderSkeleton } from "./ServerHeader"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/queryKeys"
import { fetchServerById } from "@/actions/servers/queries"
import { ServerData } from "@/types"
import { JSX } from "react"
import CategoryTab from "./CategoryTab"
import { InviteToServerModal } from "../server/InviteToServer"
import { cn } from "@/lib/utils"
import { useUser } from "@/hooks/useUser"
import UserButton from "@/components/UserButton"
// query factory
const useServerById = (
  serverId: string,
  userId: string

): UseQueryOptions<ServerData, Error> => {
  return {
    queryKey: [QUERY_KEYS.SERVER, QUERY_KEYS.CATEGORIES , {
      serverId,
      userId
    }],
    queryFn: async () => await fetchServerById(serverId)
  }
}


/**
 * Renders a sidebar for a server category with the category name and a "New topic"
 * button.
 *
 * @param {Object} props
 * @prop {string} serverId - The ID of the server to render the sidebar for.
 */
const CategorySidebar = ({
  serverId,
}: {
  serverId: string
}): JSX.Element => {
  // fetch current serverData
  const {user} = useUser()
  const {
    data,
    isLoading,
    isError,
    status
  } = useQuery<ServerData, Error>(useServerById(serverId, user?.id!))
  if (isLoading) return <CategorySidebarSkeleton/>

  if (isError) return <pre>{JSON.stringify(status, null, 2)}</pre>

  console.log(
    "serverData", data?.server
  )

  return (
    <Sidebar
    variant="sidebar" collapsible="none" className={
      cn("border-border !p-0 relative",
        '[data-state=collapsed]:-translate-x-20 ease-in-out',
      )
    }>
      <SidebarHeader >
        <ServerHeader serverData={data?.server}/>
        {data?.server.id}
      </SidebarHeader>
      <SidebarContent  >
        {data!.server!.categories!.map((category) =>{
          // console.log('Cat', category)
           return <CategoryTab key={category.id} category={category} />
        })}
      </SidebarContent>
      <SidebarFooter>
        <UserButton/>
      </SidebarFooter>
    </Sidebar>
  )
}
export default CategorySidebar


const CategorySidebarSkeleton = () => {
  return (
    <Sidebar variant="sidebar" collapsible="offcanvas" className="translate-x-14 border-border !p-0">
      <SidebarHeader>
      <ServerHeaderSkeleton/>
      </SidebarHeader>
      <SidebarContent>
        {/* <SidebarGroup>
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="h-8 w-full animate-pulse bg-gray-200 dark:bg-neutral-900 rounded-md mb-2"></div>
          ))}
        </SidebarGroup>
      */}
</SidebarContent>
      <SidebarFooter>
        <div className="h-12 w-full animate-pulse bg-gray-200 dark:bg-neutral-900 rounded-md"></div>
      </SidebarFooter>
    </Sidebar>
  );
};

export { CategorySidebarSkeleton };
