'use client'

import { SidebarProvider } from "@/components/ui/sidebar";
import CategorySidebar from "@/modules/category/CategorySidebar";
import { useParams } from "next/navigation";

const ServerLayout = (
  { children }: { children: React.ReactNode }
) => {
  const { sId } = useParams();
  if (!sId) return <div className="h-full">Server not found</div>;
  return (
    <div className="h-full relative bg-emerald-100 w-full">
      <SidebarProvider className="">
        <CategorySidebar serverId={sId as string} />
      </SidebarProvider>
      <div className="w-full">
      {children}
      </div>
    </div>
  )
}
export default ServerLayout