import { auth } from "@/auth/auth"
import Button from "@/components/tiffui/Button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { headers } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"

// Define the server action
async function signOutAction() {
	"use server"
	try {
		await auth.api.signOut({
			headers: await headers(),
		})
		// clear all session and cookies if failed
	} catch (error) {}
	redirect("/") // optional: redirect to home or login after sign out
}

const SignOutPage = () => {
	return (
		<form
			action={signOutAction}
			className="flex items-center justify-center"
		>
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl font-semibold">
						Wanna sign out?
					</CardTitle>
					<CardDescription className="text-muted-foreground">
						You will be redirected to the login page.
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-2">
					<Button
						variant="destructive"
						type="submit"
						className="w-full"
					>
						Sign Out
					</Button>
					<Button
						variant="link"
						className="w-full text-muted-foreground"
					>
						Return
					</Button>
				</CardContent>
			</Card>
		</form>
	)
}

export default SignOutPage
