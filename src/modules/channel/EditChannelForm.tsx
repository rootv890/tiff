'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useModal } from "@/app/providers/ModalProvider";
import {Controller, useForm} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { QUERY_KEYS } from "@/queryKeys";
import { ChannelEnum, ChannelType } from "@/types"
import { selectChannelSchema } from "@/db/schema";
import { cn } from "@/lib/utils"
import { Label } from "@/components/tiffui/Label"
import { RiLoader2Fill } from "react-icons/ri"
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/tiffui/Input";
import { useServer } from "@/hooks/useServer";
import Button from "@/components/tiffui/Button";
import { DialogFooter } from "@/components/ui/dialog";
import { mutateChannelAction } from "@/actions/server/mutations";

const EDIT_CHANNEL_SCHEMA =  selectChannelSchema

const EditChannelForm = (
  {channelData}: {channelData: ChannelType}
) => {
  const queryClient = useQueryClient()
// current server id
const {server,user} =  useServer()
const{setOpen} = useModal()
const availableCategories =server?.categories || []
  // useForm
  const {control, watch,register,handleSubmit, formState: { errors,isSubmitting,isLoading } } =  useForm<ChannelType>({
    resolver: zodResolver(EDIT_CHANNEL_SCHEMA),
    defaultValues:{
      ...channelData,
      // type: channelData.type,
      // categoryId: channelData.categoryId,
      // name: channelData.name,
    }
  })

  const {mutateAsync, status} = useMutation({
    mutationKey: [QUERY_KEYS.UPDATE_CHANNEL],
    mutationFn: async (data: ChannelType) => {
      const result = await mutateChannelAction(user?.id || "", data);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: () => {
      toast.success("Channel updated successfully");
      queryClient.invalidateQueries({ queryKey:
        [QUERY_KEYS.CATEGORIES,QUERY_KEYS.SERVER, {serverId: server?.id!}] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update channel");
      console.error(error);
    },
  })




  return (
    <form onSubmit={handleSubmit(async(data)=>mutateAsync(data))} className="flex flex-col gap-4">
      <div  className="flex flex-col gap-2">
      <Label htmlFor="name" className={cn(errors.name && "text-red-400")}>
          Channel Name {errors.name && "- Required"}
        </Label>
        <Input
          placeholder="Channel Name"
          {...register("name")}
          id="name"
          className={cn(errors.name && "border-destructive")}
        />
      </div>
      <div className="flex flex-col gap-2" >
        <Label htmlFor="name" className={cn(errors.name && "text-red-400")}>
          Channel Type {errors.type && "- Required"}
        </Label>

        <Controller control={control} name='type' render={({ field:{onChange, value} }) => (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Channel Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.values(ChannelEnum).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )} />
            <div className="flex flex-col gap-2" >
              <Label htmlFor="name" className={cn(errors.categoryId && "text-red-400")}>
                Category {errors.categoryId && "- Required"}
              </Label>
              <Controller control={control} name='categoryId' render={({ field:{onChange, value} }) => (
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {availableCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )} />
            </div>
        <DialogFooter className="w-full items-center">
        <Button
          onClick={() => setOpen(null)}
          variant={"link"}
          type="button"
          className="mr-auto text-muted-foreground"
        >
          Back
        </Button>

        <Button type="submit" size={"lg"} disabled={isSubmitting || isLoading || status === "pending" || !server?.id}>

          {isSubmitting || isLoading || status === "pending" ? (
            <RiLoader2Fill className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Update"
          )}
        </Button>
      </DialogFooter>
      </div>
      <pre className="overflow-scroll max-w-[320px]">{JSON.stringify(watch())}</pre>
    </form>
  )
}
export default EditChannelForm