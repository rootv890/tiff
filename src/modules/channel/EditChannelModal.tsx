"use client";
import { useModal } from "@/app/providers/ModalProvider";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ModalOpenType } from "@/types";
import EditChannelForm from "./EditChannelForm";


const EditChannelModal = () => {
  const { open, setOpen, channelData } = useModal();
  return (
    <Dialog
      open={open === ModalOpenType.EDIT_CHANNEL}
      // open={true}
      onOpenChange={() => setOpen(null)}
    >
      <DialogContent className="bg-background p-8 rounded-lg w-108 ">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold">
            Edit Channel
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mb-4 text-center">
            Give your new channel a name.
          </DialogDescription>
        </DialogHeader>
        <EditChannelForm channelData={channelData!}/>
      </DialogContent>
    </Dialog>
  )
}
export default EditChannelModal