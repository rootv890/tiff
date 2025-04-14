import { Skeleton } from "@/components/ui/skeleton";

export function ServersSidebarSkeleton() {
  return (
    <div className="w-20 bg-[#1e1f22] p-3 flex flex-col items-center space-y-4">
      {/* Home Button Skeleton */}
      <Skeleton className="w-12 h-12 rounded-full" />

      {/* Divider */}
      <div className="w-8 h-[2px] bg-[#2f3136] my-2" />

      {/* Server Icons Skeleton */}
      {[...Array(8)].map((_, i) => (
        <Skeleton key={i} className="w-12 h-12 rounded-full" />
      ))}
    </div>
  );
}
