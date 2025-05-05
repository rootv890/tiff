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
import Link from "next/link";




const TiffLauncher = () => {
  const { setOpen } = useModal();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="max-w-[60px] mx-auto aspect-square w-full rounded-xl group  hover:bg-muted">
          <TbCategory2 className="size-8 mx-auto group-hover:text-foreground text-muted-foreground transition-colors  duration-500" />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start"
        className="p-(--item-padding)  [--item-padding:--spacing(2)] rounded-xl ">
          <DropdownMenuGroup className="flex flex-col  gap-x-4 gap-y-2">
            <DropdownMenuItem
              className="menu-item"
              onClick={() => {
                setOpen(ModalOpenType.CREATE_SERVER);
              }}
            >
              <FaPlus className="size-5 text-success" />
              Create Server
            </DropdownMenuItem>
            <DropdownMenuItem className="menu-item">
              <RiCompass3Fill className="size-6 text-success" />
              Explore Servers
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="menu-item">
              <Link href="/servers/all">
                <TiThSmallOutline className="size-6 text-success" />
                List All Servers
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <CreateServerModal />
    </>
  );
};

export default TiffLauncher;
