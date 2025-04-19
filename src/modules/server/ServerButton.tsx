'use client';

import Tooltip from "@/components/tiffui/ToolTip";
import { selectServerSchema } from "@/db/schema";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { z } from "zod";
import { motion } from "motion/react";

type ServerButtonProps = {
  serverData: z.infer<typeof selectServerSchema>;
  className?: string;
  active?: boolean;
  type?: "dm" | "server";
};

const ServerButton = ({
  serverData,
  className,
  active,
  type = "server",
}: ServerButtonProps) => {
  return (
    <motion.button
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "w-full max-w-[48px] h-fit flex flex-col items-center justify-center group mx-auto aspect-square rounded-xl hover:rounded-full transition-all isolate duration-300 ease-in-out relative p-0",
        className,
        active && "rounded-full",
      )}
    >
      {type === "server" && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: active ? 24 : 8 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="inset-x-0 -left-2 top-1/2 -translate-y-1/2 absolute"
        >
          <div className="w-1 rounded-full bg-foreground h-full" />
        </motion.div>
      )}

      <Tooltip content={serverData.name}>
        <motion.div
          className="w-full aspect-square"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Image
            src={
              serverData.avatar ||
              "https://res.cloudinary.com/drhdaopqy/image/upload/v1744648941/no_profile_wd3etl.png"
            }
            alt={serverData.name}
            width={36}
            height={36}
            className="rounded-2xl object-cover w-full h-full"
          />
        </motion.div>
      </Tooltip>
    </motion.button>
  );
};

export default ServerButton;
