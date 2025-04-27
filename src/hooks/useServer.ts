import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/hooks/useUser";

import { QUERY_KEYS } from "@/queryKeys";
import { fetchServerById } from "@/actions/servers/queries";

export const useServer = () => {
  const { user } = useUser();
  const { sId } = useParams();

  const isReady = !!user?.id && !!sId;
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.SERVER, QUERY_KEYS.CATEGORIES, {
      serverId: sId as string,
      userId: user?.id,
    }],
    queryFn: () => fetchServerById(sId as string),
    enabled: isReady,
    refetchOnWindowFocus: false,
  });

  return {
    server: data?.server,
    user,
    isLoading: !isReady || isLoading,
  };
};
