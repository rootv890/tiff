import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
export const ServerAvatar = ({ src, name , className}: { src: string; name: string, className?: string }) => {
  return (
    <Avatar className={cn('size-10',className)}>
      <AvatarImage  src={src} />
      <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};
