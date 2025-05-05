"use client";
import { useModal } from "@/app/providers/ModalProvider";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useServer } from "@/hooks/useServer";

import { ModalOpenType } from "@/types";
import Image from "next/image";
import { ServerAvatar } from "./ServerAvatar";
import { Input } from "@/components/tiffui/Input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/queryKeys";
import { generateNewServerInviteCode } from "@/actions/server/mutations";
import { fetchServerById } from "@/actions/servers/queries";
import { CopyIcon } from "lucide-react";
import { useState } from "react";
import { cn, getBaseUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { isModerator } from "@/actions/base";





export function InviteToServerModal() {
  const { open, setOpen } = useModal();
  const {server,user} = useServer()
  const queryClient = useQueryClient();
  const [isCopied, setIsCopied] = useState(false);
  const {mutateAsync, status:mutationStatus} = useMutation({
    mutationKey: [QUERY_KEYS.SERVER,server?.id],
    mutationFn: () => generateNewServerInviteCode(server?.id!, user?.id!),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SERVER, QUERY_KEYS.CATEGORIES , {
          serverId: server?.id
        }]
      })
    }
  })

  const isAdmin = true

  const handleCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(`${getBaseUrl()}/i/${server?.inviteCode! || ""}`);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Dialog
      open={open === ModalOpenType.INVITE_TO_SERVER}
      // open={true}
      onOpenChange={() => setOpen(null)}
    >
      <DialogContent className="bg-background p-8 rounded-lg w-108 ">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold">
            Invite your friends
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mb-4 text-center">
         <ServerAvatar className="size-16 mx-auto border-3 border-border" src={server?.avatar || ""} name={server?.name || ""}/>
            <span className="text-base font-semibold">
              {server?.name}
            </span>
          </DialogDescription>
        </DialogHeader>
        {/* Form */}
        <div className="mb-4 relative">
          <Input className={cn("!text-lg h-14", isCopied && "border-emerald-400 border-2")} value={ `${getBaseUrl()}/i/${server?.inviteCode! || ""}` } />
          <Button variant={'default'} className={
            cn("absolute right-2 font-semibold top-1/2 -translate-y-1/2" ,
              mutationStatus === "pending" && "opacity-50 cursor-not-allowed",
              isCopied && "bg-emerald-400 hover:bg-emerald-400"
            )
          }
            onClick={handleCopy}
            disabled={mutationStatus === "pending"}
          >
            {
              isCopied ? "Copied" : "Copy"
            }
          </Button>
        </div>
        <DialogFooter className="flex !justify-center !items-center">
         {
          isAdmin ? ( <Button className="text-primary-foreground"  disabled={mutationStatus === "pending"} variant={'link'} onClick={ async() => {
            await mutateAsync()
           }}>
             {mutationStatus === "pending" ? "Generating..." : "Generate New Invite Code"}
           </Button>) :
           <div className="text-muted-foreground text-balance text-center">
            Link broken? Ask your server owner to generate a new invite code.
           </div>
         }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
