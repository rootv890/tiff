import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
const Profile = ({ src, name }: { src: string; name: string }) => {
	return (
		<Avatar className="size-10 rounded-full bg-background">
			<AvatarImage src={src} />
			<AvatarFallback>{name[0]}</AvatarFallback>
		</Avatar>
	)
}

export default Profile
