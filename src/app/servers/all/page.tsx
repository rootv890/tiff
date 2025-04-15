"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { selectServerSchema } from "@/db/schema";
import { ServerAvatar } from "@/modules/server/ServerAvatar";
import ServerCard from "@/modules/server/ServerCard";
import { useAllServers } from "@/react-queries/queries";
import { Flex } from "@radix-ui/themes";
import Image from "next/image";

import { z } from "zod";

const AllServersPage = () => {
  const { data, isLoading, isError, error } = useAllServers();
  if (isLoading) return <div>Loading....</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <div className="h-screen w-screen ">
      <ScrollArea type="scroll" className="h-full p-4">
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
