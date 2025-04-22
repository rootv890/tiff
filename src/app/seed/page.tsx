'use client'

import { getServerCategories } from "@/actions/server/queries"
import Debugger from "@/components/tiffui/Debugger"
import { useUser } from "@/hooks/useUser"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"

function useCatgories(serverId: string, userId: string) :UseQueryOptions{
  return useQuery({
    queryKey: ["categories", serverId],
    queryFn: () => getServerCategories(serverId, userId),
  })
}

const SeedPage = () => {
  const {user} = useUser()
  const {data: categories, error, status} = useCatgories("SR_GJknE0ty", user?.id || '')
  return (
    <div>
      <h1>SeedPage</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'error' && <p>{error}</p>}
      <Debugger clas data={categories} />
    </div>
  )
}
export default SeedPage