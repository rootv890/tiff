// react query to fetch userData

import { getSession } from "@/actions/auth";
import { QUERY_KEYS } from "@/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.USER],
    queryFn: getSession,
  });
  return {
    user: data?.user,
    session: data?.session,
    isPending,
    isError,
    error,
    refetch,
  };
};
