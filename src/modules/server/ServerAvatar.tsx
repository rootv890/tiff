import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export const ServerAvatar = ({ src, name }: { src: string; name: string }) => {
  return (
    <Avatar className="size-10">
      <AvatarImage className="" src={src} />
      <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};
