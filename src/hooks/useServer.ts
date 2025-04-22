// get current server id
import { useUser } from "@/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/queryKeys";
import { useParams } from "next/navigation";
import { fetchServerById } from "@/actions/servers/queries";

export const useServer = () => {
  const { user } = useUser();
  const { sId } = useParams();
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.SERVERS, user?.id],
    queryFn: () => fetchServerById(sId as string),
  });
  // once user and server are loaded, return them
  if (!user || !data) return { server: undefined, user: undefined };
  return { server: data.server, user };
};
