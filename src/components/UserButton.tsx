'use client';

import { useUser } from "@/hooks/useUser";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MicOff, Headphones, Settings } from "lucide-react";
import { motion } from "motion/react";

const UserButton = () => {
  const { user } = useUser();
  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-xl h-14 w-full bg-card flex items-center justify-between px-2"
    >
      {/* Left Side: Avatar + Username + Status */}
      <div className="flex items-center gap-2 hover:bg-accent p-1 rounded-xl pr-4 cursor-pointer ">
        <Avatar className="size-10">
          {user.image ? (
            <AvatarImage src={user.image} alt={user.name} />
          ) : (
            <AvatarFallback>
              {user.name?.[0]?.toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="flex flex-col leading-none">
          <span className="text-base font-semibold text-foreground">{user.name}</span>
          <span className="text-[11px] text-muted-foreground">{user.status || "Online"}</span>
        </div>
      </div>

      {/* Right Side: Buttons */}
      <div className="flex items-center justify-center ">
        <Button variant="ghost" size="icon" className="w-10 h-10 p-2 hover:bg-muted rounded-full">
          <MicOff className="size-5 text-destructive" />
        </Button>
        <Button variant="ghost" size="icon" className="w-10 h-10 p-2 hover:bg-muted rounded-full">
          <Headphones className="size-5 text-muted-foreground hover:text-foreground" />
        </Button>
        <Button variant="ghost" size="icon" className="w-10 h-10 p-2 hover:bg-muted rounded-full">
          <Settings className="size-5 text-muted-foreground hover:text-foreground" />
        </Button>
      </div>
    </motion.div>
  );
};

export default UserButton;
