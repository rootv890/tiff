"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import ServerCard from "@/modules/server/ServerCard";
import { useAllServers } from "@/react-queries/queries";




const AllServersPage = () => {
  const { data, isLoading, isError, error } = useAllServers();
  if (isLoading) return <div>Loading....</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <div className="min-h-screen w-full bg-background">
  <ScrollArea type="scroll" className="h-full p-4">
    <div className="mb-6">
      <h1 className="text-2xl font-bold leading-tight text-foreground">
        All Servers
      </h1>
      <p className="text-muted-foreground text-sm">
        {data?.servers?.length} servers found
      </p>
    </div>

    {/* Main Grid */}
    <div className="grid w-full max-w-6xl mx-auto grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] gap-4 justify-items-start">
      {data?.servers?.map((server) => (
        <div key={server.id} className="w-full">
          <ServerCard {...server} />
        </div>
      ))}
    </div>
  </ScrollArea>
</div>


  );
};
export default AllServersPage;
