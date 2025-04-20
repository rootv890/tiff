'use client';

import { useAllServers } from "@/react-queries/queries";

import { Flex } from "@radix-ui/themes";
import ServerButton from "./ServerButton";
import TiffLauncher from "./TiffLauncher";
import { ServersSidebarSkeleton } from "./LoadingServers";
import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";

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
//  [--card-padding:--spacing(1)]
  return (
    <div className="bg-white py-4 w-full max-w-14 px-2">
      <div className="h-full overflow-y-auto flex flex-col justify-start items-center  " >
        <motion.div
          className="w-full  flex flex-col gap-4  "
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants}>
            <ServerButton
              type="dm"
              key="dm"
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
          </motion.div>

          <motion.div variants={itemVariants}>
            <TiffLauncher />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Separator />
          </motion.div>

          <Flex className="w-full " direction="column" gapY="3">
            {servers.map((server) => (
              <motion.div key={server.id} variants={itemVariants}>
                {/* @ts-ignore */}
                <ServerButton serverData={server} />
              </motion.div>
            ))}
          </Flex>
        </motion.div>
      </div>
    </div>
  );
};

export default ServersSidebar;
