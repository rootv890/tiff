import ServersSidebar from "@/modules/server/Sidebar";
import { Flex } from "@radix-ui/themes";

const ServersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex direction="row" className="h-screen w-screen">
      <ServersSidebar />
      {children}
    </Flex>
  );
};
export default ServersLayout;
