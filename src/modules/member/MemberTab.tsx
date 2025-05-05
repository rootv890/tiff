'use client'

import { memo } from "react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/tiffui/Label";

import { MemberType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/queryKeys";
import { useServer } from "@/hooks/useServer";
import { kickUserAction, updateMemberAction } from "@/actions/server/mutations";
import { toast } from "sonner";

import { GiBarefoot } from "react-icons/gi";
import { PiShieldStarLight } from "react-icons/pi";

// ---------------- MemberButton ----------------

export const MemberButton = ({ member }: { member: MemberType }) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md justify-start transition">
          <Avatar className="size-7">
            <AvatarImage src={member.user.image || "/default-avatar.png"} alt={member.user.name} />
            <AvatarFallback>
              {member.user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-base text-foreground/90 font-medium truncate">{member.user.name}</span>
        </Button>
      </ContextMenuTrigger>

      <MemberContextMenu member={member} />
    </ContextMenu>
  );
};

// ---------------- MemberContextMenu ----------------

const MemberContextMenuComponent = ({ member }: { member: MemberType }) => {
  const { server, user } = useServer();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: [QUERY_KEYS.MEMBERS, { userId: member.userId }],
    mutationFn: async (value: "owner" | "admin" | "member") => {
      if (!user?.id || !server?.id) return;
      await updateMemberAction(user.id, server.id, member.id, value);
    },
    onSuccess: () => {
      toast.success("Member role updated successfully");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.MEMBERS, { userId: member.userId }],
      });
    },
  });

  const { mutate: kickUser } = useMutation({
    mutationKey: [QUERY_KEYS.MEMBERS, { userId: member.userId }],
    mutationFn: async () => {
      if (!user?.id || !server?.id) return;
      await kickUserAction(user.id, server.id, member.id);
    },
    onSuccess: () => {
      toast.success("User kicked successfully");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SERVER, { userId: member.userId , serverId: server?.id }],
      });
    },
  });

  return (
    <ContextMenuContent className="w-64">
      <div className="px-2 py-1.5 flex flex-col gap-2">
        <Label className="!text-sm mb-2">Change Role</Label>

        <Select
          onValueChange={(value) => {
            mutate(value as "member" | "owner" | "admin");
          }}
          defaultValue={member.role ?? "member"}
        >
          <SelectTrigger className="w-full !h-8 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <PiShieldStarLight className="size-5" />
              <SelectValue placeholder="Change Role" />
            </div>
          </SelectTrigger>

          <SelectContent>
            {["owner", "admin", "member"].map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ContextMenuSeparator />

      <ContextMenuItem variant="destructive" className="flex items-center gap-2" onClick={() => kickUser()}>
        <GiBarefoot className="size-5" />
        Kick
      </ContextMenuItem>
    </ContextMenuContent>
  );
};

// Memoize to fix dev portal bug
export const MemberContextMenu = memo(MemberContextMenuComponent);
