"use client";
import { useAllServers } from "@/react-queries/queries";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Flex } from "@radix-ui/themes";
import ServerButton from "./ServerButton";
import TiffLauncher from "./TiffLauncher";
import { ServersSidebarSkeleton } from "./LoadingServers";
import { Separator } from "@/components/ui/separator";

const ServersSidebar = () => {
  const { data, isLoading, isError, error } = useAllServers();

  if (isLoading) return <ServersSidebarSkeleton />;
  if (isError) return <div>Error: {error.message}</div>;

  const servers = data?.servers || [];
  console.log(servers);

  return (
    <div className="bg-sidebar py-4  w-full max-w-[5.2rem] px-2">
      <ScrollArea type="scroll" className="h-full">
        <Flex
          className=" w-full max-w-[5.6rem]"
          gapX={"0"}
          gapY={"3"}
          direction={"column"}
          align={"center"}
        >
          <ServerButton
            type="dm"
            key={1}
            className="bg-secondary max-w-[56px]"
            serverData={{
              id: "1",
              name: "Direct Messages",
              avatar: "/logo_main.png",
              banner: null,
              description: null,
              createdAt: new Date(),
              updatedAt: new Date(),
              ownerId: "1",
              isPublic: false,
              inviteCode: null,
              boostCount: null,
            }}
          />
          <TiffLauncher />

          <Separator />

          <Flex className=" w-full" gapX={"0"} direction={"column"} gapY={"3"}>
            {servers.map((server) => (
              <ServerButton key={server.id} serverData={server} />
            ))}
          </Flex>
        </Flex>
      </ScrollArea>
    </div>
  );
};
export default ServersSidebar;
