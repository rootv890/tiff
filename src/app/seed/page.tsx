'use client'

import { getServerCategories } from "@/actions/server/queries"
import Debugger from "@/components/tiffui/Debugger"
import { useUser } from "@/hooks/useUser"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { useModal } from "../providers/ModalProvider"
import { ModalOpenType } from "@/types"
import { CreateCategoryModal } from "@/modules/category/mnf/CreateCategoryModal"
function useCatgories(serverId: string, userId: string) :UseQueryOptions{
  return useQuery({
    queryKey: ["categories", serverId],
    queryFn: () => getServerCategories(serverId, userId),
  })
}

const SeedPage = () => {
  const {user} = useUser()
  const {data: categories, error, status} = useCatgories("SR_GJknE0ty", user?.id || '')
  const {open, setOpen} = useModal()
  return (
    <div>
      <h1>SeedPage</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'error' && <p>{error}</p>}
      {/* <Debugger clas data={categories} /> */}

      <button onClick={() => setOpen(ModalOpenType.CREATE_CATEGORY)}>
        OPEN MODAL
      </button>
      <CreateCategoryModal type="EDIT" opts={{ categoryId: "CG_123" }} />
    </div>
  )
}
export default SeedPage