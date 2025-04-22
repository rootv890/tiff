"use client";
import { useModal } from "@/app/providers/ModalProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CreateCategoryForm } from "./CreateCategoryForm";
import { ModalOpenType } from "@/types";



export function CreateCategoryModal() {
  const { open, setOpen } = useModal();
  return (
    <Dialog
      open={open === ModalOpenType.CREATE_CATEGORY}
      // open={true}
      onOpenChange={() => setOpen(null)}
    >
      <DialogContent className="bg-background p-8 rounded-lg w-108 ">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold">
            Create Category
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mb-4 text-center">
            Give your new category a name.
          </DialogDescription>
        </DialogHeader>
        <CreateCategoryForm />
      </DialogContent>
    </Dialog>
  );
}
