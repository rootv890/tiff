"use client";
import { FaPlus } from "react-icons/fa6";
import { RiCompass3Fill } from "react-icons/ri";
import { TbCategory2 } from "react-icons/tb";
import { TiThSmallOutline } from "react-icons/ti";

import { useModal } from "@/app/providers/ModalProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModalOpenType } from "@/types";
import { CreateServerModal } from "./mnf/CreateServerModal";

const TiffLauncher = () => {
  const { setOpen } = useModal();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="max-w-[60px] mx-auto aspect-square w-full rounded-xl group  hover:bg-muted">
          <TbCategory2 className="size-8 mx-auto group-hover:text-foreground text-muted-foreground transition-colors  duration-500" />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start" className="p-2">
          {" "}
          <DropdownMenuGroup className="grid grid-cols-2  gap-x-4 gap-y-2">
            <DropdownMenuItem
              className="p-3 col-span-2 flex items-center justify-center"
              onClick={() => {
                setOpen(ModalOpenType.CREATE_SERVER);
              }}
            >
              <FaPlus className="size-5 text-success" />
              Create Server
            </DropdownMenuItem>
            <DropdownMenuItem className="px-3 py-3 flex items-center">
              <RiCompass3Fill className="size-6 text-success" />
              Explore Servers
            </DropdownMenuItem>
            <DropdownMenuItem className="px-3 py-3 flex items-center">
              <TiThSmallOutline className="size-6 text-success" />
              List All Servers
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <CreateServerModal />
    </>
  );
};

export default TiffLauncher;
