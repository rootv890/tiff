'use client'


import CategorySidebar from "@/modules/category/CategorySidebar";
import MemberSidebar from "@/modules/member/MemberSidebar";
import { useParams } from "next/navigation";

const ServerLayout = (
  { children }: { children: React.ReactNode }
) => {
  const { sId } = useParams();
  if (!sId) return <div className="h-full">Server not found</div>;
  return (
    <div className="h-full flex relative  w-full">
        <CategorySidebar serverId={sId as string} />
      {children}
        <MemberSidebar serverId={sId as string}/>
    </div>
  )
}
export default ServerLayout