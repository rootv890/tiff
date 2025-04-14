"use client";
import { useModal } from "@/app/providers/ModalProvider";
import Button from "@/components/tiffui/Button";
import { Input } from "@/components/tiffui/Input";
import { Label } from "@/components/tiffui/Label";
import { DialogFooter } from "@/components/ui/dialog";
import { useUser } from "@/hooks/useUser";
import { cn, imageReader, randomServerAvatar } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { z } from "zod";
import UploadServerIconSVG from "@/components/UploadServerIcon";

import {
  createServerAction,
  CreateServerType,
} from "@/actions/servers/mutations";
import { QUERY_KEYS } from "@/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useImageUploadMutation } from "@/cloudinary/uploadImage";
import { useEffect, useRef, useState } from "react";

// 🔐 Schema
const createServerSchema = z.object({
  avatar: z.string().url().optional(),
  name: z.string().min(3).max(20),
});

type CreateServerSchemaType = z.infer<typeof createServerSchema>;

const CreateServerForm = () => {
  const { user, isPending } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadImage, isPending: isImageUploadPending } =
    useImageUploadMutation(
      (data) => {
        toast.success("Image uploaded successfully", {
          description: data.cloudinaryUrl,
        });
        setValue("avatar", data.cloudinaryUrl);
        setImageUrl(data.cloudinaryUrl);
      },
      (error) => {
        toast.error("Failed to upload image");
        console.error(error);
      },
    );
  const { setOpen } = useModal();

  // Form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<CreateServerSchemaType>({
    resolver: zodResolver(createServerSchema),
  });

  //  Mutation
  const queryClient = useQueryClient();
  const createServerMutation = useMutation({
    mutationKey: [QUERY_KEYS.CREATE_SERVER],
    mutationFn: async (data: CreateServerType) => {
      const result = await createServerAction(data);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: () => {
      toast.success("Server created successfully");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SERVERS] });
      setOpen(null);
      reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create server");
      console.error(error);
    },
  });

  // 📨 Submit handler
  const onSubmit = async (data: CreateServerSchemaType) => {
    if (isPending || !user) return;

    try {
      let uploadResult;
      if (file) {
        uploadResult = await new Promise<{
          cloudinaryUrl: string;
          publicId: string;
        }>((resolve, reject) => {
          uploadImage(file, {
            onSuccess: (data) => resolve(data),
            onError: (error) => reject(error),
          });
        });
      } else {
        const serverAvatar = randomServerAvatar();
        uploadResult = {
          cloudinaryUrl: serverAvatar.url,
          publicId: serverAvatar.publicId,
        };
      }

      await createServerMutation.mutateAsync({
        name: data.name,
        ownerId: user.id,
        avatar: uploadResult.cloudinaryUrl || "",
        description: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create server");
    }
  };

  useEffect(() => {
    if (file) {
      imageReader(file).then((result) => {
        setImageUrl(result as string);
      });
    }
  }, [file]);

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
        <Input
          ref={fileInputRef}
          hidden
          type="file"
          className="w-[200px]"
          accept="image/*"
          name="avatarUpload"
          onChange={async (e) => {
            setFile(e.target.files?.[0] || null);
          }}
        />

        <div
          className="size-18 mx-auto rounded-full border-accent flex gap-1 flex-col justify-center items-center text-muted-foreground text-[12px] relative cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Avatar preview"
              className="w-16 h-16 rounded-full mx-auto border object-cover"
            />
          ) : (
            <UploadServerIconSVG />
          )}
        </div>
      </Flex>

      {/* 📝 Name input */}
      <div className="w-full flex flex-col gap-3">
        <Label htmlFor="name" className={cn(errors.name && "text-red-400")}>
          Display Name {errors.name && "- Required"}
        </Label>
        <Input
          id="name"
          type="text"
          defaultValue={`${user?.name}'s Server`}
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
          {isSubmitting ||
          isPending ||
          isImageUploadPending ||
          createServerMutation.isPending ? (
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
