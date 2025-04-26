'use client'

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/tiffui/Input"
import Button from "@/components/tiffui/Button"
import { DialogFooter } from "@/components/ui/dialog"
import { useModal } from "@/app/providers/ModalProvider"
import { CategoryType, ChannelType } from "@/types"
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
import { QUERY_KEYS } from "@/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { createChannelAction } from "@/actions/server/mutations"
import { useServer } from "@/hooks/useServer"
import { cn } from "@/lib/utils"
import { Label } from "@/components/tiffui/Label"
import { RiLoader2Fill } from "react-icons/ri"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { z } from "zod"



const CREATE_CHANNEL_SCHEMA = z.object({
  name: z.string().min(3).max(20),
  type: z.nativeEnum(ChannelType),
  serverId: z.string(),
  categoryId: z.string().optional(),
})

type createChannelType = z.infer<typeof CREATE_CHANNEL_SCHEMA>

export const CreateChannelForm = (
  {
    from,
    categoryData
  }:{
    from: "category" | "server"
    categoryData?: CategoryType
  }
) => {

  // show all the categorie sin select  in server mode

  const {server, user} = useServer()
  const queryClient = useQueryClient();
  const { register, handleSubmit,control, formState: { errors , isSubmitting , isLoading }, watch } = useForm<createChannelType>({
    resolver: zodResolver(CREATE_CHANNEL_SCHEMA),
    defaultValues:{
      type: ChannelType.TEXT,
      serverId: categoryData?.serverId || server?.id || "",
      name: "",
      categoryId: from === "category" ? categoryData?.id : ""
    }
  })
  const { setOpen } = useModal();

  // current server id
  const availableCategories = from === "server" ? server?.categories || [] : []

  const { mutate ,status, error} = useMutation({
    mutationKey: [QUERY_KEYS.CREATE_CHANNEL],
    mutationFn: async (data: createChannelType) => {
      const result = await createChannelAction(user?.id || "", server?.id || "", data.categoryId!,  data.name, data.type as ChannelType);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: () => {
      toast.success("Channel created successfully");
      setOpen(null);
      queryClient.invalidateQueries({ queryKey:
        [QUERY_KEYS.CATEGORIES,QUERY_KEYS.SERVER, {serverId: server?.id!}] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create channel");
      console.error(error);
    },
  });
  return (
    <form
    className="w-full flex flex-col gap-6" onSubmit={handleSubmit((data) => {
      console.log("submit", data);
      mutate(data);
    })}>
      <div className="flex flex-col gap-2" >
        {server?.id} / {categoryData?.serverId}
        <Label htmlFor="name" className={cn(errors.name && "text-red-400")}>
          Channel Name {errors.name && "- Required"} {from}
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
          Channel Type {errors.name && "- Required"}
        </Label>

        <Controller control={control} name='type' render={({ field:{onChange, value} }) => (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Channel Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.values(ChannelType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )} />


         {
          from === "server" && (
            <div className="flex flex-col gap-2" >
              <Label htmlFor="name" className={cn(errors.name && "text-red-400")}>
                Category {errors.name && "- Required"}
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
          )
         }

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
            "Create"
          )}
        </Button>
      </DialogFooter>
   <pre className="text-muted-foreground max-w-[300px]">
   ERROR: {error?.message}
   {JSON.stringify(watch())}
   </pre>
    </form>
  )
}
