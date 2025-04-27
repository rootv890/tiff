'use client';

import { getServerByInviteCode } from "@/actions/server/queries";
import { useUser } from "@/hooks/useUser";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image"; // Or use Shadcn Avatar if configured

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { acceptUserByInviteCodeAction } from "@/actions/server/mutations";
import { User } from "better-auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// Input component was requested, but not visible in the image layout.
// import { Input } from "@/components/ui/input";

// Assuming you have a component for the Server Avatar, or just use a simple img
// Example placeholder if needed:
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const InvitePage = () => {
  const { inviteId } = useParams();
  const { user } = useUser(); // Although user is fetched, it's not used in the *display* part of the invite card itself based on the image.
const router = useRouter()
  const { data, isLoading, error } = useQuery({
    queryKey: ["server-invite", inviteId], // Changed key slightly for clarity it's invite data
    queryFn: () => getServerByInviteCode(inviteId as string),
    enabled: !!inviteId, // Only run the query if inviteId is available
  });

  const {mutateAsync, status, error: mutationError} =  useMutation({
    mutationKey: ["accept-invite", inviteId],
    mutationFn: () => acceptUserByInviteCodeAction(user as User, inviteId as string, data?.id as string),
    onSuccess: () => {
      // Handle success, e.g., redirect to server
      toast.success("Joined server successfully");
      // Redirect to server
      router.push(`/servers/${data?.id}`);
    },
  })

  const handleAccept = async () => {
   await mutateAsync();
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading invite...</div>;
  }

  if (error) {
    // Handle error, e.g., invite not found or expired
    return <div className="flex justify-center items-center h-screen text-red-500">Error loading invite: {(error as Error).message}</div>;
  }

  // If data is null or undefined after loading, handle it
  if (!data) {
      return <div className="flex justify-center items-center h-screen text-yellow-500">Invalid or expired invite link.</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br w-full from-purple-700 to-indigo-900 p-4"> {/* Add background styling */}
      <Card className="w-full max-w-sm rounded-3xl  bg-card text-card-foreground shadow-lg "> {/* Use Shadcn Card */}
        <CardHeader className="flex flex-col items-center text-center pt-6">
          {/* Server Avatar */}
          <div className="mb-4">
            {data.avatar ? (
               <Image
                 src={data.avatar}
                 alt={`${data.name} avatar`}
                 width={80} // Adjust size as needed
                 height={80} // Adjust size as needed
                 className="rounded-full object-cover border-4 border-accent aspect-square" // Basic styling
               />
            ) : (
              // Fallback for no avatar
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-xl font-bold">
                 {data.name[0]}
              </div>
            )}
          </div>

          {/* Inviter Info */}
          <CardDescription className="text-muted-foreground mb-2">
             <span className="font-semibold text-foreground">{data.owner.name || 'Someone'}</span>{data.owner.name ? ` ${data.owner.username}` : ''} invited you to join
          </CardDescription>

          {/* Server Name */}
          <CardTitle className="text-2xl font-bold">{data.name}</CardTitle>

          {/* Member Counts */}
          <div className="flex items-center text-sm text-muted-foreground mt-2">
            <span className="flex items-center mr-3">
              <span className="size-2 rounded-full bg-green-500 mr-1 inline-block"></span>
              {data.members.length} Online
            </span>
            <span className="flex items-center">
               <span className="size-2 rounded-full bg-gray-500 mr-1 inline-block"></span>
              {data.members.length} Members
            </span>
          </div>
        </CardHeader>

        <CardFooter className="px-6 pb-6 pt-0">
          {/* Accept Invite Button */}
          <Button className="w-full py-6 text-lg" onClick={() => {
            // TODO: Implement logic to accept the invite
            console.log("Accepting invite for server:", data.id);
            // You'll likely use a mutation here to join the server
            handleAccept();
          }}>
            Accept Invite
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InvitePage;