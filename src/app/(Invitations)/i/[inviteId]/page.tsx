'use client';

import { getServerByInviteCode } from "@/actions/server/queries";
import { useUser } from "@/hooks/useUser";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {motion} from 'motion/react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // Shadcn skeleton
import Image from "next/image";
import { acceptUserByInviteCodeAction } from "@/actions/server/mutations";
import { User } from "better-auth";
import { toast } from "sonner";
import InviteSkeleton from "./_components/InviteSkeleton";
import InvalidInviteCard from "./_components/InvalidInvite";

const InvitePage = () => {
  const { inviteId } = useParams();
  const { user } = useUser();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["server-invite", inviteId],
    queryFn: () => getServerByInviteCode(inviteId as string),
    enabled: !!inviteId,
  });

  const { mutateAsync, status, error: mutationError } = useMutation({
    mutationKey: ["accept-invite", inviteId],
    mutationFn: () => acceptUserByInviteCodeAction(user as User, inviteId as string, data?.id as string),
    onSuccess: (info) => {
      if (info.success) {
        toast.success("Joined server successfully");
        router.push(`/servers/${data?.id}`);
      }
      if (info.error) {
        toast.warning(info.error);
      }
    },
  });

  const handleAccept = async () => {
    await mutateAsync();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <InviteSkeleton />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <InvalidInviteCard />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br w-full from-purple-700 to-indigo-900 p-4">
      {/* Animate the Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        <Card className="rounded-3xl bg-card text-card-foreground shadow-lg">
          <CardHeader className="flex flex-col items-center text-center pt-6">
            <div className="mb-4">
              {data.avatar ? (
                <Image
                  src={data.avatar}
                  alt={`${data.name} avatar`}
                  width={80}
                  height={80}
                  className="rounded-full object-cover border-4 border-accent aspect-square"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-xl font-bold">
                  {data.name[0]}
                </div>
              )}
            </div>

            <CardDescription className="text-muted-foreground mb-2">
              <span className="font-semibold text-foreground">{data.owner.name || 'Someone'}</span>{data.owner.name ? ` ${data.owner.username}` : ''} invited you to join
            </CardDescription>

            <CardTitle className="text-2xl font-bold">{data.name}</CardTitle>

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
  <Button
    className="w-full py-6 text-lg relative overflow-hidden"
    onClick={handleAccept}
    disabled={status === "pending"} // prevent spamming
  >
    <motion.div
      key={status} // animate between different statuses
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center gap-2"
    >
      {status === "pending" && (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Joining...
        </>
      )}
      {status === "success" && (
        <>
          <span className="text-green-400">🎉</span> Joined!
        </>
      )}
      {status === "error" && (
        <>
          <span className="text-red-400">⚠️</span> Error
        </>
      )}
      {status === "idle" && "Accept Invite"}
    </motion.div>
  </Button>
</CardFooter>

        </Card>
      </motion.div>
    </div>
  );
};

export default InvitePage;
