'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/tiffui/Input"
import Button from "@/components/tiffui/Button"
import { DialogFooter } from "@/components/ui/dialog"
import { useModal } from "@/app/providers/ModalProvider"
import { CREATE_CATEGORY_SCHEMA, createCategorySchema } from "@/types"
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
import { QUERY_KEYS } from "@/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { createCategoryAction } from "@/actions/server/mutations"
import { useUser } from "@/hooks/useUser"
import { useServer } from "@/hooks/useServer"
import { cn } from "@/lib/utils"

import { Label } from "@/components/tiffui/Label"
import { RiLoader2Fill } from "react-icons/ri"


export const CreateCategoryForm = () => {
  const { register, handleSubmit,reset, formState: { errors , isSubmitting , isLoading }, watch } = useForm<CREATE_CATEGORY_SCHEMA>({
    resolver: zodResolver(createCategorySchema),
  })
  const { setOpen } = useModal();
  const queryClient = useQueryClient();
  // current server id

  const {server, user} = useServer()


  const mutation = useMutation({
    mutationKey: [QUERY_KEYS.CREATE_CATEGORY],
    mutationFn: async (data: CREATE_CATEGORY_SCHEMA) => {
      const result = await createCategoryAction(user?.id || "", server?.id || "", data.name);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: () => {
      toast.success("Category created successfully");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CATEGORIES] });
      setOpen(null);
      reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create category");
      console.error(error);
    },
  });
  return (
    <form
    className="w-full flex flex-col gap-6" onSubmit={handleSubmit((data: CREATE_CATEGORY_SCHEMA) => {
      console.log(data);
      mutation.mutate(data);
    })}>
      <div className="flex flex-col gap-2" >
        <Label htmlFor="name" className={cn(errors.name && "text-red-400")}>
          Category Name {errors.name && "- Required"}
        </Label>
      <Input
        placeholder="Category Name"
        {...register("name")}
        id="name"
        className={cn(errors.name && "border-destructive")}
      />
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

        <Button type="submit" size={"lg"} disabled={isSubmitting || isLoading}>

          {isSubmitting || isLoading ? (
            <RiLoader2Fill className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Create"
          )}
        </Button>
      </DialogFooter>
      {JSON.stringify(watch())}

    </form>
  )
}