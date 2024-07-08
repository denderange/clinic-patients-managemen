"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField from "./CustomFormField";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/formValidation";
import { useRouter } from "next/navigation";

export enum FormFieldType {
	INPUT = "input",
	TEXTAREA = "textarea",
	PHONE_INPUT = "phoneInput",
	CHACKBOX = "checkbox",
	DATE_PICKER = "datePicker",
	SELECT = "select",
	SKELETON = "skeleton",
}

const PatientForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof UserFormValidation>>({
		resolver: zodResolver(UserFormValidation),
		defaultValues: {
			username: "",
			email: "",
			phone: "",
		},
	});

	const onSubmit = async ({
		username,
		email,
		phone,
	}: z.infer<typeof UserFormValidation>) => {
		setIsLoading(true);

		try {
			// const userData = {username, email, phone}
			// const user = await createUser(userData)
			// if(user){
			//   router.push(`/patients/${user.$id}/register`)
			// }
		} catch (error) {
			console.log("Patient Form error", error);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6 flex-1'>
				<section className='mb-12 space-y-4'>
					<h1 className='header'>-=Hi=-</h1>
					<p className='text-dark-700'>Schedule your first appointment.</p>
				</section>

				<CustomFormField
					control={form.control}
					fieldType={FormFieldType.INPUT}
					name='name'
					label='Full name'
					placeholder='Full Name'
					iconSrc='/assets/icons/user.svg'
					iconAlt='user'
				/>
				<CustomFormField
					control={form.control}
					fieldType={FormFieldType.INPUT}
					name='email'
					label='Email'
					placeholder='email'
					iconSrc='/assets/icons/email.svg'
					iconAlt='email'
				/>
				<CustomFormField
					control={form.control}
					fieldType={FormFieldType.PHONE_INPUT}
					name='phone'
					label='Phone number'
					placeholder='phone number'
				/>

				<SubmitButton isLoading={isLoading}>Get started</SubmitButton>
			</form>
		</Form>
	);
};

export default PatientForm;
