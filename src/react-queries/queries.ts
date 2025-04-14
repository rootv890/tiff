/**
 * All query options at one place
 */

import { fetchAllServers } from "@/actions/servers/queries";
import { useUser } from "@/hooks/useUser";
import { QUERY_KEYS } from "@/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useAllServers = () => {
  const { user } = useUser();
  return useQuery({
    queryKey: [QUERY_KEYS.SERVERS, user?.id],
    queryFn: () => fetchAllServers(user?.id || ""),
  });
};
