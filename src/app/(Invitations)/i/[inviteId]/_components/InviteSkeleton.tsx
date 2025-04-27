import {
  Card,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
const InviteSkeleton = () => {
  return (
    <Card className="w-full max-w-sm rounded-3xl bg-card text-card-foreground shadow-lg">
      <CardHeader className="flex flex-col items-center text-center pt-6">
        <Skeleton className="w-20 h-20 rounded-full mb-4" />
        <Skeleton className="h-4 w-40 mb-2" />
        <Skeleton className="h-6 w-32 mb-2" />
        <div className="flex gap-4 mt-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </CardHeader>
      <CardFooter className="px-6 pb-6 pt-0">
        <Skeleton className="h-12 w-full rounded-md" />
      </CardFooter>
    </Card>
  );
};
export default InviteSkeleton;