"use client";
import { useModal } from "@/app/providers/ModalProvider";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CategoryType, ModalOpenType } from "@/types";
import EditCategoryForm from "./EditCategoryForm";

const EditCategoryModal = () => {
  const { open, setOpen, categoryData } = useModal();
  return (
    <Dialog
      open={open === ModalOpenType.EDIT_CATEGORY}
      // open={true}
      onOpenChange={() => setOpen(null)}
    >

      <DialogContent className="bg-background p-8 rounded-lg w-108 ">

        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold">
            Edit Category
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mb-4 text-center">
            Update your category name.
          </DialogDescription>
        </DialogHeader>
        <EditCategoryForm category={categoryData!} />
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryModal;