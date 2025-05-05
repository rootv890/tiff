// Separate file: hooks/useCategoryChannels.ts
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/hooks/useUser";
import { getServerCategories } from "@/actions/server/queries";
import { QUERY_KEYS } from "@/queryKeys";

export const useCategoryChannels = (categoryId: string) => {
  const { user } = useUser();
  return useQuery({
    queryKey: [QUERY_KEYS.CHANNELS, categoryId],
    queryFn: () => getServerCategories(categoryId, user?.id || ""),
    enabled: !!user?.id,
  });
};
