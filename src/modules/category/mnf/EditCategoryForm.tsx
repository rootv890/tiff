'use client'
import { Input } from "@/components/tiffui/Input"
import { Label } from "@/components/tiffui/Label"
import { cn } from "@/lib/utils"
import { CategoryType } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { DialogFooter } from "@/components/ui/dialog"
import  Button  from "@/components/tiffui/Button"
import { useModal } from "@/app/providers/ModalProvider"
import { RiLoader2Fill } from "react-icons/ri"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editCategoryAction } from "@/actions/server/mutations"
import { useServer } from "@/hooks/useServer"
import { QUERY_KEYS } from "@/queryKeys"

const EditCategorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
})

type EditCategorySchemaType= z.infer<typeof EditCategorySchema>

const EditCategoryForm = ({ category }: { category: CategoryType }) => {

  const { register, handleSubmit, formState: { errors, isLoading,isSubmitting } } = useForm<EditCategorySchemaType>({
    resolver: zodResolver(EditCategorySchema),
    defaultValues: {
      name: category.name
    }
  })
  const { setOpen } = useModal();
  const {user,server} = useServer()
  const queryClient = useQueryClient();
  const { mutateAsync ,status, error} = useMutation({
    mutationKey: [QUERY_KEYS.CATEGORIES, {categoryId: category.id}],
    mutationFn: async (data: EditCategorySchemaType) => {
      const result = await editCategoryAction(user?.id || "", server?.id || "", category.id, data.name);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: () => {
      toast.success("Category created successfully");
      setOpen(null);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CATEGORIES] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create category");
      console.error(error);
    },
  });


  const onSubmit = async (data: EditCategorySchemaType) => {
    await mutateAsync(data);
  }

  return (
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
             <Label htmlFor="name" className={cn(errors.name && "text-red-400")}>
               Category Name {errors.name && "- Required"}
             </Label>
           <Input
             placeholder="Category Name"
             {...register("name")}
             id="name"
             className={cn(errors.name && "border-destructive")}
           />
           <DialogFooter className="w-full items-center">
             <Button
               onClick={() => setOpen(null)}
               variant={"link"}
               type="button"
               className="mr-auto text-muted-foreground"
             >
               Back
             </Button>
             <Button type="submit" size={"lg"} disabled={isSubmitting || isLoading || status === "pending"}>
               {isSubmitting || isLoading || status === "pending" ? (
                 <RiLoader2Fill className="mr-2 h-4 w-4 animate-spin" />
               ) : (
                 "Update"
               )}
             </Button>
           </DialogFooter>
      </form>
  )
}
export default EditCategoryForm