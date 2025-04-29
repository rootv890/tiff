'use client'
import { useParams } from "next/navigation";
const ChannelPage = () => {
  const { cId } = useParams();
  return (
    <div className="h-full">ChannelPage {cId}
    </div>
  )
}
export default ChannelPage