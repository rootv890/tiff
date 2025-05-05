"use client"

import { redirect } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { signInWithEmail } from "@/actions/auth"
import ErrorMessage from "@/components/ErrorMessage"
import Button from "@/components/tiffui/Button"
import { Input } from "@/components/tiffui/Input"
import { Label } from "@/components/tiffui/Label"
import { cn } from "@/lib/utils"
import { QUERY_KEYS } from "@/queryKeys"
import { zodResolver } from "@hookform/resolvers/zod"
import { Flex } from "@radix-ui/themes"
import { useMutation } from "@tanstack/react-query"

const FLEX_GAP = "3"

const SignInSchema = z.object({
	email: z.string().email("Invalid email address").min(1, "Email is required"),
	password: z.string().min(1, "Password is required"),
})

type SignInSchemaType = z.infer<typeof SignInSchema>

const SignInForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInSchemaType>({
		resolver: zodResolver(SignInSchema),
	})

	const mutation = useMutation({
		mutationKey: [QUERY_KEYS.USER, QUERY_KEYS.SIGN_IN],
		mutationFn: (data: SignInSchemaType) => signInWithEmail(data),
		onSuccess: () => {
			alert("Successfully signed in!")
			redirect("/servers")
		},
		onError: (error) => {
			console.error("Sign-in error:", error)
		},
	})

	function onSubmit(values: SignInSchemaType) {
		// console.log("submitting sign in", values);
		mutation.mutateAsync(values)
	}

	return (
		<form
			className="bg-background p-8 rounded-lg w-96"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Flex
				direction={"column"}
				gap={"5"}
				justify={"center"}
				className="w-full "
			>
				<h1 className="text-3xl text-center font-bold">Welcome Back!</h1>

				<Flex
					direction={"column"}
					gap={FLEX_GAP}
					className="w-full"
				>
					<Label
						htmlFor="email"
						className={cn(errors.email && "text-red-400")}
					>
						Email {errors.email && `- ${errors.email.message}`}
					</Label>
					<Input
						id="email"
						type="email"
						placeholder="peter.parker@stark.com"
						{...register("email")}
						className={cn(errors.email && "border-destructive")}
					/>
					<ErrorMessage message={errors.email?.message} />
				</Flex>

				<Flex
					direction={"column"}
					gap={FLEX_GAP}
					className="w-full"
				>
					<Label
						htmlFor="password"
						className={cn(errors.password && "text-red-400")}
					>
						Password {errors.password && `- ${errors.password.message}`}
					</Label>
					<Input
						id="password"
						type="password"
						placeholder="**********"
						{...register("password")}
						className={cn(errors.password && "border-destructive")}
					/>
					<ErrorMessage message={errors.password?.message} />
				</Flex>

				<Button
					size={"xl"}
					variant={"submit"}
					className="w-full text-sm mt-4"
					type="submit"
					disabled={isSubmitting || mutation.isPending}
				>
					{isSubmitting || mutation.isPending ? "Signing In..." : "Sign In"}
				</Button>
				{mutation.isError && (
					<ErrorMessage
						message={mutation.error?.message || "An unexpected error occurred."}
					/>
				)}
			</Flex>
		</form>
	)
}
export default SignInForm
