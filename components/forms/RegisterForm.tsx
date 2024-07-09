"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/formValidation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patients.actions";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Doctors, GenderOptions, IdentificationTypes } from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";

const RegisterForm = ({ user }: { user: User }) => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof UserFormValidation>>({
		resolver: zodResolver(UserFormValidation),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
		},
	});

	const onSubmit = async ({
		name,
		email,
		phone,
	}: z.infer<typeof UserFormValidation>) => {
		setIsLoading(true);

		try {
			const userData = { name, email, phone };
			const user = await createUser(userData);
			if (user) {
				router.push(`/patients/${user.$id}/register`);
			}
		} catch (error) {
			console.log("Patient Form error", error);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-12 flex-1'>
				<section className='space-y-4'>
					<h1 className='header'>Welcome</h1>
					<p className='text-dark-700'>Let us know more about yourself</p>
				</section>

				<section className='space-y-6'>
					<div className='mb-9 space-y-1'>
						<h2 className='sub-header'>Personal information</h2>
					</div>
				</section>

				<CustomFormField
					control={form.control}
					fieldType={FormFieldType.INPUT}
					name='name'
					label='Full Name'
					placeholder='Full Name'
					iconSrc='/assets/icons/user.svg'
					iconAlt='user'
				/>

				<div className='flex flex-col gap-6 xl:flex-row'>
					<CustomFormField
						fieldType={FormFieldType.INPUT}
						control={form.control}
						name='email'
						label='Email'
						placeholder='email'
						iconSrc='/assets/icons/email.svg'
						iconAlt='email'
					/>
					<CustomFormField
						fieldType={FormFieldType.PHONE_INPUT}
						control={form.control}
						name='phone'
						label='Phone number'
						placeholder='phone number'
					/>
				</div>

				<div className='flex flex-col gap-6 xl:flex-row'>
					<CustomFormField
						fieldType={FormFieldType.DATE_PICKER}
						control={form.control}
						name='birthDate'
						label='Date of birth'
					/>
					<CustomFormField
						fieldType={FormFieldType.SKELETON}
						control={form.control}
						name='gender'
						label='Gender'
						renderSkeleton={(field) => (
							<FormControl>
								<RadioGroup
									className='flex h-11 xl:justify-between'
									onValueChange={field.OnChange}
									defaultValue={field.value}>
									{GenderOptions.map((option: string) => (
										<div
											className='radio-group'
											key={option}>
											<RadioGroupItem value={option} />
											<Label
												htmlFor={option}
												className='cursor-pointer'>
												{option}
											</Label>
										</div>
									))}
								</RadioGroup>
							</FormControl>
						)}
					/>
				</div>

				<div className='flex flex-col gap-6 xl:flex-row'>
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.INPUT}
						name='address'
						label='Address'
						placeholder='Home address'
					/>
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.INPUT}
						name='occupation'
						label='Occupation'
						placeholder='Occupation'
					/>
				</div>

				<div className='flex flex-col gap-6 xl:flex-row'>
					<CustomFormField
						fieldType={FormFieldType.INPUT}
						control={form.control}
						name='emergencyContactName' // same name as in db
						label='Emergency contact name'
						placeholder="Guardian's name"
					/>
					<CustomFormField
						fieldType={FormFieldType.PHONE_INPUT}
						control={form.control}
						name='emergencyContactPhone' // same name as in db
						label='Emergency contact phone'
						placeholder='phone number'
					/>
				</div>

				<section className='space-y-6'>
					<div className='mb-9 space-y-1'>
						<h2 className='sub-header'>Medical information</h2>
					</div>
				</section>

				<CustomFormField
					fieldType={FormFieldType.SELECT}
					control={form.control}
					name='primaryPhysician' // same name as in db
					label='Primary physician'
					placeholder='select a aphysician'>
					{Doctors.map((doctor) => (
						<SelectItem
							key={doctor.name}
							value={doctor.name}>
							<div className='flex cursor-pointer items-center gap-2'>
								<Image
									src={doctor.image}
									width={32}
									height={32}
									alt={doctor.name}
									className='rounded-full border border-dark-500'
								/>
								<p>{doctor.name}</p>
							</div>
						</SelectItem>
					))}
				</CustomFormField>

				<div className='flex flex-col gap-6 xl:flex-row'>
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.INPUT}
						name='insuranceProvider'
						label='Insurance provider'
						placeholder='Insurance provider'
					/>
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.INPUT}
						name='InsurancePolicyNumber'
						label='Insurance policy number'
						placeholder='Insurance policy number'
					/>
				</div>

				<div className='flex flex-col gap-6 xl:flex-row'>
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.TEXTAREA}
						name='allergies'
						label='Allergies'
						placeholder='are there any allergies ?'
					/>
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.TEXTAREA}
						name='currentMedication'
						label='Current medication'
						placeholder='Current medication'
					/>
				</div>

				<div className='flex flex-col gap-6 xl:flex-row'>
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.TEXTAREA}
						name='familyMedicalHistory'
						label='Family medical history'
						placeholder='Family medical history'
					/>
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.TEXTAREA}
						name='pastMedicalHistory'
						label='Past medical history'
						placeholder='Past medical history'
					/>
				</div>

				<section className='space-y-6'>
					<div className='mb-9 space-y-1'>
						<h2 className='sub-header'>Identification and Verification</h2>
					</div>
				</section>

				<CustomFormField
					fieldType={FormFieldType.SELECT}
					control={form.control}
					name='identificationType' // same name as in db
					label='Identification type'
					placeholder='Select an identification type'>
					{IdentificationTypes.map((item) => (
						<SelectItem
							key={item}
							value={item}>
							{item}
						</SelectItem>
					))}
				</CustomFormField>

				{/* information from the provided document: */}
				<CustomFormField
					fieldType={FormFieldType.INPUT}
					control={form.control}
					name='identificationNumber'
					label='Identification number'
					placeholder='Identification number'
				/>

				<CustomFormField
					fieldType={FormFieldType.SKELETON}
					control={form.control}
					name='identificationDocument'
					label='Identification document file'
					renderSkeleton={(field) => (
						<FileUploader
							files={field.value}
							onChange={field.onChange}
						/>
					)}
				/>

				<SubmitButton isLoading={isLoading}>Get started</SubmitButton>
			</form>
		</Form>
	);
};

export default RegisterForm;
