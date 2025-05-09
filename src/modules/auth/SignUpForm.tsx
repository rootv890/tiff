"use client"

import { signUpWithEmail } from "@/actions/auth"
import ErrorMessage from "@/components/ErrorMessage"
import Button from "@/components/tiffui/Button"
import Checkbox from "@/components/tiffui/Checkbox"
import Debugger from "@/components/tiffui/Debugger"
import { Input } from "@/components/tiffui/Input"
import { Label } from "@/components/tiffui/Label"
import { cn } from "@/lib/utils"
import { QUERY_KEYS } from "@/queryKeys"
import { SignUpWithEmailSchema, SignUpWithEmailSchemaType } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Flex } from "@radix-ui/themes"
import { useMutation } from "@tanstack/react-query"
import { redirect } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

const FLEX_GAP = "3"
const SignUpForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
		control,
	} = useForm<SignUpWithEmailSchemaType>({
		defaultValues: {
			status: "online",
			pronouns: "",
			bio: "",
			banner: "",
			image: "",
		},
	})

	/**
	 * Mutations
	 */
	const mutation = useMutation({
		// mutation
		mutationKey: [QUERY_KEYS.USER, QUERY_KEYS.SIGN_IN],
		mutationFn: (data: SignUpWithEmailSchemaType) => signUpWithEmail(data),
		onSuccess: () => {
			// Todo : toast
			alert("You have successfully signed up!")
			redirect("/servers")
		},
		onError: (data) => {
			console.log(data)
		},
	})
	/**
	 * Submission
	 */
	function onSubmit(values: SignUpWithEmailSchemaType) {
		// console.log("submitting", values)
		mutation.mutate(values)
	}

	return (
		<form
			className="bg-background p-8 rounded-lg"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Flex
				direction={"column"}
				gap={"5"}
				justify={"center"}
				className="w-full "
			>
				<h1 className="text-3xl text-center font-bold">Create Account</h1>

				{/* Email Field */}
				<Flex
					direction={"column"}
					gap={FLEX_GAP}
					className="w-full"
				>
					<Label
						htmlFor="email"
						className={cn(errors.email && "text-red-400")}
					>
						Email {errors.email && "- Required"}
					</Label>
					<Input
						id="email"
						type="email"
						placeholder="peter.parker@stark.com"
						{...register("email", {
							required: "Email is required",
						})}
						className={cn(errors.email && "border-destructive")}
					/>
				</Flex>

				{/* Display Name Field */}
				<Flex
					direction={"column"}
					gap={FLEX_GAP}
					className="w-full"
				>
					<Label
						htmlFor="name"
						className={cn(errors.name && "text-red-400")}
					>
						Display Name {errors.name && "- Required"}
					</Label>
					<Input
						id="name"
						type="text"
						placeholder="Spiderman"
						{...register("name", {
							required: "Display Name is required",
						})}
						className={cn(errors.name && "border-destructive")}
					/>
				</Flex>

				{/* Username Field */}
				<Flex
					direction={"column"}
					gap={FLEX_GAP}
					className="w-full"
				>
					<Label
						htmlFor="username"
						className={cn(errors.username && "text-red-400")}
					>
						Username {errors.username && "- Required"}
					</Label>
					<Input
						id="username"
						type="text"
						placeholder="spider_man_3"
						{...register("username", {
							required: "Username is required",
						})}
						className={cn(errors.username && "border-destructive")}
					/>
				</Flex>

				{/* Passwor	d Field */}
				<Flex
					direction={"column"}
					gap={FLEX_GAP}
					className="w-full"
				>
					<Label
						htmlFor="password"
						className={cn(errors.password && "text-red-400")}
					>
						Password {errors.password && "- Required"}
					</Label>
					<Input
						id="password"
						type="password"
						placeholder="**********"
						{...register("password", {
							required: "Password is required",
							minLength: {
								message: "Password must be at least 8 characters long",
								value: 8,
							},
						})}
						className={cn(errors.password && "border-destructive")}
					/>
				</Flex>
				{/* Accept TOS */}
				<Flex
					direction={"row"}
					gap={"2"}
					className="w-full"
				>
					<Controller
						name="acceptTos"
						control={control}
						rules={{ required: "Please accept the Terms" }}
						render={({ field }) => (
							<Checkbox
								checked={!!field.value}
								onCheckedChange={(val) => field.onChange(!!val)}
								id="acceptTos"
							/>
						)}
					/>

					<Label htmlFor="acceptTos">
						I accept the{" "}
						<span className="text-primary inline">Tiff&apos;s</span> Terms of
						Service
					</Label>
				</Flex>
				<ErrorMessage message={errors.acceptTos?.message} />

				{/* Submit Button */}
				<Button
					size={"xl"}
					variant={"submit"}
					className="w-full text-sm"
					type="submit"
					disabled={isSubmitting || mutation.isPending}
				>
					{isSubmitting || mutation.isPending ? "Signing up..." : "Sign Up"}
				</Button>
				{mutation.isError && <ErrorMessage message={mutation.error.message} />}
			</Flex>
			<Debugger data={watch()} />
		</form>
	)
}
export default SignUpForm
