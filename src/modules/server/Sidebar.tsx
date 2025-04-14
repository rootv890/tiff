import { ScrollArea } from "@/components/ui/scroll-area";
import { Flex } from "@radix-ui/themes";
import ServerButton from "./ServerButton";
import TiffLauncher from "./TiffLauncher";

const ServersSidebar = () => {
  return (
    <Flex
      direction={"column"}
      gap={"4"}
      align={"center"}
      py={"2"}
      width={"80px"}
      style={{
        background: "var(--sidebar)",
      }}
    >
      <ScrollArea type="scroll" className="h-full">
        <Flex gap={"4"} direction={"column"} align={"center"}>
          <ServerButton
            key={1}
            serverData={{
              id: "1",
              name: "Direct Messages",
              avatar: "/logo_dark.svg",
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
        </Flex>
      </ScrollArea>
    </Flex>
  );
};
export default ServersSidebar;
