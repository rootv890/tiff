'use client'


import CategorySidebar from "@/modules/category/CategorySidebar";
import ChannelHeader from "@/modules/channel/ChannelHeader";
import MemberSidebar from "@/modules/member/MemberSidebar";
import { useParams } from "next/navigation";

const ServerLayout = (
  { children }: { children: React.ReactNode }
) => {
  const { sId, cId } = useParams();
  // validate the server and member e
  if (!sId) return <div className="h-full">Server not found</div>;
  return (
    <div className="h-full flex relative  w-full">
        <CategorySidebar serverId={sId as string} />
      <div className="h-full w-full bg-green-500 flex flex-col">
      {cId && <ChannelHeader serverId={sId as string} channelId={cId as string} />}
      <div className="h-full bg-red-500">{children}</div>
      <MemberSidebar />
      </div>
    </div>
  )
}
export default ServerLayout