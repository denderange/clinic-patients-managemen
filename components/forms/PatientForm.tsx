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

export enum FormFieldType {
	INPUT = "input",
	TEXTAREA = "textarea",
	PHONE_INPUT = "phoneInput",
	CHACKBOX = "checkbox",
	DATE_PICKER = "datePicker",
	SELECT = "select",
	SKELETON = "skeleton",
}

const formSchema = z.object({
	username: z.string().min(2).max(50),
});

const PatientForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

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

				<Button type='submit'>Submit</Button>
			</form>
		</Form>
	);
};

export default PatientForm;
