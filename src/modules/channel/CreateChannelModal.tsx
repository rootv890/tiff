"use client";
import { useModal } from "@/app/providers/ModalProvider";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CategoryType, ModalOpenType } from "@/types";
import { CreateChannelForm } from "./CreateChannelForm";



export function CreateChannelModal(
 ) {
  const { open, setOpen, categoryData, from } = useModal();
  return (
    <Dialog
      open={open === ModalOpenType.CREATE_CHANNEL}
      onOpenChange={() => setOpen(null)}
    >
      <DialogContent className="bg-background p-8 rounded-lg w-108 ">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold">
            Create Channel
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mb-4 text-center">
            Give your new channel a name.
          </DialogDescription>
        </DialogHeader>
        <CreateChannelForm categoryData={categoryData!}  from={from}  />
      </DialogContent>
    </Dialog>
  );
}
