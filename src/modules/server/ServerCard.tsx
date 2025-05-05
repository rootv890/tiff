import { selectServerSchema } from "@/db/schema";
import Image from "next/image";
import { ServerAvatar } from "./ServerAvatar";
import { Flex } from "@radix-ui/themes";
import { Badge } from "@/components/ui/badge";
import { isRecentlyJoined } from "@/lib/utils";
import { ServerType } from "@/types";

/**
 * ServerCard is a component that displays a server as a card.
 * @param props - The server data. Must conform to the `selectServerSchema` schema.
 * @returns A JSX element representing the server card.
 */



const ServerCard = (props: ServerType) => {
  return (
    <div
    className="bg-card hover:bg-card/80 rounded-(--card-radius)
    p-(--card-padding) h-auto aspect-video min-h-[180px] w-full flex flex-col gap-0 outline-offset-0 outline-card-foreground/20 outline-[1px]
    [--card-radius:var(--radius-xl)] [--card-padding:--spacing(1)]"
  >
      <div className="flex   flex-1 max-w-sm bg-background overflow-hidden mask-b-from-50% mask-b-to-100%  rounded-t-[calc(var(--card-radius)-var(--card-padding))]  relative ">
        {/* badges on top */}
        <div className="inset-x-0 p-1  h-fit top-3 overflow-x-auto
         -translate-y-1/2 absolute flex gap-x-1 w-full flex-nowrap">
          {
            isRecentlyJoined(props.joinedAt.toString()) && (
              <Badge variant={'secondary'} className="text-xs opacity-75 ">Newly Joined</Badge>
            )
          }
         </div>
        {props.banner?.url ? (
          <Image
            alt={props.name}
            src={props.banner?.url }
            width={150}
            height={150}
            className="object-cover size-full aspect-square "
          />
        ) : (
          <div className="w-full h-full"
            style={{
              backgroundColor: props.banner?.color || "red",
            }}
          >
          </div>
        )}
      </div>
      <div className="flex flex-1 py-2   w-full">
        <div className="flex flex-col gap-1 p-(--card-padding)">
          <Flex gap="2">
            <ServerAvatar src={props.avatar || ""} name={props.name} />
            <Flex direction="column" gap="0">
              <p className="text-foreground font-semibold">{props.name}</p>
            </Flex>
          </Flex>
        </div>

      </div>

    </div>
  );
};

export default ServerCard;

// TODO : Online and Total members indicator
// Joined Date
// More option button -  with Hide from Sidebar and Add back, LEave Server, Mute