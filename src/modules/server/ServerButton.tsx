import Tooltip from "@/components/tiffui/ToolTip";
import { selectServerSchema } from "@/db/schema";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { z } from "zod";

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
    <button
      className={cn(
        "w-full max-w-[48px] h-fit flex flex-col items-center justify-center  group    mx-auto aspect-square  rounded-xl hover:rounded-full  transition-all isolate duration-300 ease-in-out relative p-0",
        className,
        active && "rounded-full",
      )}
    >
      {type === "server" && (
        <div className="inset-x-0 -left-2  -translate-y-1/2 top-1/2 absolute">
          <div
            className={cn(
              "w-1 rounded-full h-2 bg-foreground group-hover:h-4 transition-all duration-300 ease-in-out",
              active && "h-6",
            )}
          ></div>
        </div>
      )}
      <Tooltip content={serverData.name}>
        <div className="w-full aspect-square">
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
        </div>
      </Tooltip>
    </button>
  );
};

export default ServerButton;
