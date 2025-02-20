import { Button } from "@beta-lyfe/ui/components/shad/ui/button";
import { MultiStepForm,StepComponent } from "@beta-lyfe/ui/components/multi-step-form";
import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { Input } from "@beta-lyfe/ui/components/shad/ui/input";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@beta-lyfe/ui/components/shad/ui/input-otp"
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@beta-lyfe/ui/components/shad/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "./-components/layout";
import { $api } from "@beta-lyfe/webapp/lib/backend";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { defaultValues } from "./-components/credentials";
import { ArrowLeft, ArrowLeftFromLine, ArrowLeftIcon, ArrowRight, Stethoscope, User } from "lucide-react";
import { capitalize } from "lodash";

export const Route = createFileRoute("/_app/auth/sign-up")({
	component: SignInPage,
});

const formSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

function SignInPage() {
	
	const router = useRouter();
	const goBack = () => router.history.back();

	return (
		<AuthLayout.Container>
			<div className="h-full flex flex-col justify-between items-center p-6 lg:items-start lg:p-12">
				<div className="max-w-md w-full flex justify-end ">
					<Button className="self-end border-2
					relative
					border-black w-min flex text-white gap-2"
			 type="submit">Sign in</Button>
				</div>
				<div className="w-full overflow-clip">
					<MultiStepForm 
					steps={[SignupLetGetStartedForm,WhatDoYouLikeToBe,HowToBeContacted,JustOneMoreStep,SecureYourAccount]}
					/>
				</div>
				<div />
			</div>
		</AuthLayout.Container>
	);
}


const VerifyOtp=()=>{
	

export function InputOTPPattern() {
  return (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}

}

const SignupForm:StepComponent=()=>{
	const toastId = useRef<string | number>();

	const router = useRouter();
	const goBack = () => router.history.back();


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

	return (<Form {...form}>
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className="w-full max-w-md flex flex-col gap-4"
		>
			<header className="text-xl font-semibold text-left w-full">
				Sign up
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
				{/*<Link href="">Forgot password?</Link>*/}
				Alreadh have an account?{" "}
				<Link href="/auth/sign-in" className="text-primary">
					Sign in
				</Link>
			</div>
			<Button type="submit">Submit</Button>
		</form>
	</Form>)
}

const WhatDoYouLikeToBe:StepComponent=({next,prev})=>{

	return(
		<div>
			<h2 className="text-xl font-bold">What would you like to be?</h2>
			<div className="flex space-x-5 items-center justify-center p-9">
				<UserOrDoctor who="user"/>
				<UserOrDoctor who="doctor"/>
			</div>
			<div className="flex justify-between">
			<Button className="self-end border-2 border-black w-min flex text-white gap-2"
			 type="submit"
			 onClick={prev}
			 ><ArrowLeft /> Back</Button>
			 <Button className="self-end border-2 border-black w-min flex text-white gap-2"
			 type="submit" onClick={next}>Next <ArrowRight /></Button>
			</div>
		</div>
	)
}

function UserOrDoctor({who}:{who:'user' | 'doctor'}){
	return(
		<div className="border-2 border-black flex items-center justify-center space-y-2 flex-col rounded-xl w-[120px] h-[120px]">
		{who==='user'? <User size={35} className="font-thin"/> : <Stethoscope size={35}/>}
		<p>{capitalize(who)}</p>
		</div>
		
	)
}

const HowToBeContacted:StepComponent=({next,prev})=>{
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues.signIn,
	});

	return(
		<div>
			<h2 className="text-xl font-bold">How would you like to be contacted?</h2>
			<div className="flex flex-col gap-4 py-4">
				<Form {...form}>
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
				</Form>
			</div>
			<div className="flex justify-between">
			<Button className="self-end border-2 border-black w-min flex text-white gap-2"
			 type="submit"
			 onClick={prev}
			 ><ArrowLeft /> Back</Button>
			 <Button className="self-end border-2 border-black w-min flex text-white gap-2"
			 type="submit" onClick={next}>Next <ArrowRight /></Button>
			</div>
		</div>
	)
}

const SecureYourAccount:StepComponent=({next,prev})=>{
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues.signIn,
	});

	return(
		<div>
			<h2 className="text-xl font-bold">Secure yout account</h2>
			<div className="flex flex-col gap-4 py-4">
				<Form {...form}>
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
				</Form>
			</div>
			<div className="flex justify-between">
			<Button className="self-end border-2 border-black w-min flex text-white gap-2"
			 type="submit"
			 onClick={prev}
			 ><ArrowLeft /> Back</Button>
			 <Button className="self-end border-2 border-black w-min flex text-white gap-2"
			 type="submit" onClick={next}>Next <ArrowRight /></Button>
			</div>
		</div>
	)
}

const JustOneMoreStep:StepComponent=({next,prev})=>{
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues.signIn,
	});

	return(
		<div>
			<h2 className="text-xl font-bold">Just one more step</h2>
			<div className="flex flex-col gap-4 py-4">
				<Form {...form}>
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
				</Form>
			</div>
			<div className="flex justify-between">
			<Button className="self-end border-2 border-black w-min flex text-white gap-2"
			 type="submit"
			 onClick={prev}
			 ><ArrowLeft /> Back</Button>
			 <Button className="self-end border-2 border-black w-min flex text-white gap-2"
			 type="submit" onClick={next}>Next <ArrowRight /></Button>
			</div>
		</div>
	)
}

const SignupLetGetStartedForm:StepComponent=({next})=>{
	const toastId = useRef<string | number>();

	const router = useRouter();
	const goBack = () => router.history.back();


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

	return (<Form {...form}>
		<form
			onSubmit={()=>next()}
			className="w-full max-w-md flex flex-col gap-4"
		>
			<header className="text-xl font-semibold text-left">
				Let's get you all setup
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
			<Button className="self-end border-2 border-black w-min flex text-white gap-2"
			 type="submit">Next <ArrowRight /></Button>
			
		</form>

	</Form>)
}