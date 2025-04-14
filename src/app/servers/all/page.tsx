"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { selectServerSchema } from "@/db/schema";
import { ServerAvatar } from "@/modules/server/ServerAvatar";
import { useAllServers } from "@/react-queries/queries";
import { Flex } from "@radix-ui/themes";
import Image from "next/image";

import { z } from "zod";

const AllServersPage = () => {
  const { data, isLoading, isError, error } = useAllServers();
  if (isLoading) return <div>Loading....</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <div className="h-screen w-screen p-4">
      <ScrollArea type="scroll" className="h-full">
        <div className="mb-4 flex flex-col gap-px">
          <h1 className="text-2xl font-bold  leading-tight">All Servers</h1>
          <p className="text-muted-foreground leading-tight">
            {data?.servers?.length} servers found
          </p>
        </div>
        <div className="w-full grid grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))]  gap-4">
          {data?.servers?.map((server) => (
            <ServerCard key={server.id} {...server} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
export default AllServersPage;

/**
 * ServerCard is a component that displays a server as a card.
 * @param props - The server data. Must conform to the `selectServerSchema` schema.
 * @returns A JSX element representing the server card.
 */
export const ServerCard = (props: z.infer<typeof selectServerSchema>) => {
  return (
    <div
      className=" bg-card  hover:bg-card/80 rounded-(--card-radius)
      p-(--card-padding) h-auto aspect-video min-h-[180px]  w-full md:max-w-[320px] max-md:w-full flex flex-col gap-0 outline-offset-0  outline-card-foreground/20 outline-[1px]
    [--card-radius:var(--radius-xl)] [--card-padding:--spacing(1)]
    "
    >
      <div className="flex flex-1  w-full bg-background overflow-hidden mask-b-from-5% mask-b-to-100%  rounded-t-[calc(var(--card-radius)-var(--card-padding))]  ">
        {props.banner || props.avatar ? (
          <Image
            alt={props.name}
            src={props.banner || props.avatar || ""}
            width={240}
            height={240}
            className="object-cover w-full"
          />
        ) : (
          <div className="w-full h-full bg-background">
            <p className="bg-clip-text text-transparent bg-gradient-to-b to-background from-foreground text-7xl font-mono text-center font-semibold">
              {props.name.slice(0, 2).toUpperCase()}
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-1  w-full">
        <div className="flex flex-col gap-1 p-(--card-padding)">
          <Flex gap="2">
            <ServerAvatar src={props.avatar || ""} name={props.name} />
            <Flex direction="column" gap="0">
              <p className="text-foreground font-semibold">{props.name}</p>
              <p className="text-muted-foreground text-sm leading-tight">
                {props.description
                  ? props.description.length > 30
                    ? props.description.substring(0, 30) + "..."
                    : props.description
                  : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.".substring(
                      0,
                      30,
                    ) + "..."}
              </p>
            </Flex>
          </Flex>
        </div>
      </div>
    </div>
  );
};
