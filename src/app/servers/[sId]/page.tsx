'use client'
import { useParams } from "next/navigation";

const page = () => {
  const { sId } = useParams();
  return (
    <div className="">
      SID page {sId}
    </div>
  )
}
export default page