'use client'

import { getServerCategories } from "@/actions/server/queries"
import Debugger from "@/components/tiffui/Debugger"
import { useUser } from "@/hooks/useUser"
import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query"
import { useModal } from "../providers/ModalProvider"
import { ChannelType, ModalOpenType } from "@/types"
import { CreateCategoryModal } from "@/modules/category/mnf/CreateCategoryModal"
import { createCategoryAction, createChannelAction } from "@/actions/server/mutations"
import { toast } from "sonner"
import Button from "@/components/tiffui/Button"
function useCatgories(serverId: string, userId: string) :UseQueryOptions{
  return useQuery({
    queryKey: ["categories", serverId],
    queryFn: () => getServerCategories(serverId, userId),
  })
}

const SeedPage = () => {
  const {user} = useUser()
  const {data: categories, error, status} = useCatgories("SR_JnqWeFcS", user?.id || '')

  const {mutate, isLoading, data} = useMutation({
    mutationFn: ()=>{
      return createChannelAction(user?.id || '', "SR_JnqWeFcS", "CG_RoRTfqb1","NEW  CHANNEL", ChannelType.TEXT)
    },
    onSuccess: () => {
      toast.success("WOW Channel created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  })


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
      <Button onClick={async() => mutate() }>
        CREATE CHANNEL
      </Button>



      <Debugger data={categories} />
      {/* {data && <Debugger data={data} />} */}
      <CreateCategoryModal />
    </div>
  )
}
export default SeedPage