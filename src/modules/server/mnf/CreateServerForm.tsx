"use client";
import { useModal } from "@/app/providers/ModalProvider";
import Button from "@/components/tiffui/Button";
import { Input } from "@/components/tiffui/Input";
import { Label } from "@/components/tiffui/Label";
import { DialogFooter } from "@/components/ui/dialog";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { ModalOpenType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { z } from "zod";
import UploadServerIconSVG from "@/components/UploadServerIcon";
import { useCreateServerMutation } from "@/react-queries/mutations";
import { createServerAction, CreateServerType } from "@/actions/mutations";
import { QUERY_KEYS } from "@/queryKeys";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// 🔐 Schema
const createServerSchema = z.object({
  avatar: z.string().url(),
  name: z.string().min(3).max(20),
});

type CreateServerSchemaType = z.infer<typeof createServerSchema>;

const CreateServerForm = () => {
  const { user, isPending } = useUser();
  const { setOpen } = useModal();

  // 🎯 Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<CreateServerSchemaType>({
    resolver: zodResolver(createServerSchema),
    defaultValues: {
      avatar: "https://placehold.co/100x100.png",
      name: "",
    },
  });

  // 🚀 Mutation
  const mutation = useMutation({
    mutationKey: [QUERY_KEYS.CREATE_SERVER],
    mutationFn: async (data: CreateServerType) => {
      const result = await createServerAction(data);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: (data) => {
      toast.success("Server created successfully");
      setOpen(null);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create server");
      console.error(error);
    },
  });

  // 📨 Submit handler
  const onSubmit = (data: CreateServerSchemaType) => {
    console.log("Submitting with data:", data);
    if (isPending || !user) return;
    mutation.mutate({
      name: data.name,
      ownerId: user.id,
      avatar: data.avatar,
      description: "",
    });
  };

  // ⏳ Loading Skeleton
  if (isPending) {
    return (
      <div className="size-full flex items-center justify-center">
        <div className="w-full space-y-4">
          <div className="flex justify-center">
            <div className="size-18 rounded-full bg-muted" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-1/3 rounded bg-muted" />
            <div className="h-10 w-full rounded bg-muted" />
          </div>
          <div className="flex justify-end">
            <div className="h-10 w-24 rounded bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full flex flex-col gap-6"
    >
      {/* 📤 Avatar Upload (not yet wired to file input) */}
      <Flex direction={"column"} gap={"4"}>
        <button
          type="button"
          className="size-18 mx-auto rounded-full border-accent flex gap-1 flex-col justify-center items-center text-muted-foreground text-[12px] relative cursor-pointer"
        >
          <input type="file" className="relative hidden" name="avatarUpload" />
          <UploadServerIconSVG />
        </button>
      </Flex>

      {/* 📝 Name input */}
      <div className="w-full flex flex-col gap-3">
        <Label htmlFor="name" className={cn(errors.name && "text-red-400")}>
          Display Name {errors.name && "- Required"}
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Spiderman"
          {...register("name")}
          className={cn(errors.name && "border-destructive")}
        />
      </div>

      {/* 🔘 Buttons */}
      <DialogFooter className="w-full items-center">
        <Button
          onClick={() => setOpen(null)}
          variant={"link"}
          type="button"
          className="mr-auto text-muted-foreground"
        >
          Back
        </Button>

        <Button type="submit" size={"lg"} disabled={isSubmitting || isPending}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create"
          )}
        </Button>
      </DialogFooter>

      {/* 🧪 Debug */}
      {/* <pre className="w-fit max-w-[382px] bg-muted overflow-x-auto">
        {JSON.stringify(
          { ...watch(), isSubmitting, isPending, isLoading },
          null,
          2,
        )}
      </pre> */}
    </form>
  );
};

export default CreateServerForm;
