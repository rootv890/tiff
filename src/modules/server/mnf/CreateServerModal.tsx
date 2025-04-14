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
  DialogTrigger,
} from "@/components/ui/dialog";

import { ModalOpenType } from "@/types";
import CreateServerForm from "./CreateServerForm";

export function CreateServerModal() {
  const { open, setOpen } = useModal();
  return (
    <Dialog
      open={open === ModalOpenType.CREATE_SERVER}
      onOpenChange={() => setOpen(null)}
    >
      <DialogContent className="bg-background p-8 rounded-lg w-108 ">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold">
            Customize Your Server
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mb-4 text-center">
            Give your new server a personality with a name and an avatar. You
            can always change it later.
          </DialogDescription>
        </DialogHeader>
        <CreateServerForm />
      </DialogContent>
    </Dialog>
  );
}
