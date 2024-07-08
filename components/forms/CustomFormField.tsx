"use client";

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
import { Control } from "react-hook-form";
import { FormFieldType } from "./PatientForm";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";

type CustomFormFieldProps = {
	control: Control<any>;
	fieldType: FormFieldType;
	name: string;
	label?: string;
	placeholder?: string;
	iconSrc?: string;
	iconAlt?: string;
	disabled?: boolean;
	dateFormat?: string;
	showTimeSelect?: boolean;
	children?: React.ReactNode;
	renderSkeleton?: (field: any) => React.ReactNode;
};

const RenderField = ({
	field,
	props,
}: {
	field: any;
	props: CustomFormFieldProps;
}) => {
	const { fieldType, iconSrc, iconAlt, placeholder } = props;
	const {
		INPUT,
		TEXTAREA,
		PHONE_INPUT,
		CHACKBOX,
		DATE_PICKER,
		SELECT,
		SKELETON,
	} = FormFieldType;

	switch (fieldType) {
		case INPUT:
			return (
				<div className='flex rounded-md border border-dark-500 bg-dark-400'>
					{iconSrc && (
						<Image
							src={iconSrc}
							width={24}
							height={24}
							alt={iconAlt || ""}
							className='ml-2'
						/>
					)}
					<FormControl>
						<Input
							placeholder={placeholder}
							{...field}
							className='shad-input border-0'
						/>
					</FormControl>
				</div>
			);
		case PHONE_INPUT:
			return (
				<FormControl>
					<PhoneInput
						placeholder={placeholder}
						international
						withCountryCallingCode
						value={field.value as E164Number}
						onChange={field.onChange}
						className='input-phone'
					/>
				</FormControl>
			);
		default:
			break;
	}
};

const CustomFormField = (props: CustomFormFieldProps) => {
	const { control, fieldType, name, label } = props;

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className='flex-1'>
					{fieldType !== FormFieldType.CHACKBOX && label && (
						<FormLabel>{label}</FormLabel>
					)}

					<RenderField
						field={field}
						props={props}
					/>

					<FormMessage className='shad-error' />
				</FormItem>
			)}
		/>
	);
};

export default CustomFormField;
