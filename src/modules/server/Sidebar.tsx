'use client';

import { useAllServers } from "@/react-queries/queries";
import ServerButton from "./ServerButton";
import TiffLauncher from "./TiffLauncher";
import { ServersSidebarSkeleton } from "./LoadingServers";
import { motion } from "motion/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarSeparator,
  SidebarFooter
} from "@/components/ui/sidebar";

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
};

const ServersSidebar = () => {
  const { data, isLoading, isError, error } = useAllServers();

  if (isLoading) return <ServersSidebarSkeleton />;
  if (isError) return <div>Error: {error.message}</div>;

  const servers = data?.servers || [];

  return (
    <Sidebar
      className="bg-sidebar border-r border-border w-full max-w-14"
      collapsible="none"
      side="left"
    >
      <SidebarHeader className="px-2 py-4 flex flex-col items-center">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="show"
        >
          <ServerButton
            type="dm"
            key="dm"
            className="bg-secondary"
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
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="show"
          className="mt-4"
        >
          <TiffLauncher />
        </motion.div>
      </SidebarHeader>

      <SidebarSeparator className="px-2" />

      <SidebarContent className="px-2 py-4 w-full">
        <ScrollArea className="h-full w-full">
          <motion.div
            className="w-full flex flex-col items-center justify-center gap-3"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {servers.map((server) => (
              <motion.div
                className="w-full flex items-center justify-center"
                key={server.id}
                variants={itemVariants}
              >
                {/* @ts-ignore */}
                <ServerButton serverData={server} />
              </motion.div>
            ))}
          </motion.div>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="px-2 py-2">
        {/* Footer content if needed */}
      </SidebarFooter>
    </Sidebar>
  );
};

export default ServersSidebar;
