import { Typography } from "@beta-lyfe/webapp/components/typography";
import { Button } from "@beta-lyfe/webapp/components/shad/ui/button";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@beta-lyfe/webapp/components/shad/ui/tabs";
import { Input } from "@beta-lyfe/webapp/components/shad/ui/input";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@beta-lyfe/webapp/components/shad/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "./-components/layout";
import { $api } from "@beta-lyfe/webapp/lib/backend";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { defaultValues } from "./-components/credentials";

export const Route = createFileRoute("/_app/auth/sign-in")({
	component: SignInPage,
});

const formSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

function SignInPage() {
	const toastId = useRef<string | number>();

	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues.signIn,
	});

	const { mutate } = $api.useMutation("post", "/api/auth/sign-in", {
		onSuccess: (data) => {
			toast.dismiss(toastId.current);
			toast.success("Sign in successful");
		},
		onError: (error) => {
			toast.dismiss(toastId.current);
			toast.error(error.message);
		},
	});

	const onSubmit = (data: FormSchema) => {
		toastId.current = toast.loading("Signing in...");
		mutate({ body: data });
	};

	return (
		<AuthLayout.Container>
			<div className="h-full flex flex-col justify-center items-start p-12">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full max-w-md flex flex-col gap-4"
					>
						<header className="text-xl font-semibold text-center">
							Sign in
						</header>
						<div className="flex flex-col gap-4">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input type="email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input type="password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div>
							<Link href="">Forgot password?</Link>
						</div>
						<Button type="submit">Submit</Button>
					</form>
				</Form>
			</div>
		</AuthLayout.Container>
	);
}
