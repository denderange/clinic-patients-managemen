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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

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
	const {
		fieldType,
		iconSrc,
		iconAlt,
		placeholder,
		showTimeSelect,
		dateFormat,
		renderSkeleton,
	} = props;

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
		case DATE_PICKER:
			return (
				<div className='flex rounded-md border border-dark-500 bg-dark-400'>
					<Image
						src='/assets/icons/calendar.svg'
						width={24}
						height={24}
						alt='calendar'
						className='ml-2'
					/>
					<FormControl>
						<DatePicker
							selected={field.value}
							onChange={(date) => field.onChange(date)}
							dateFormat={dateFormat ?? "dd.MM.yyyy"}
							showTimeSelect={showTimeSelect ?? false}
							timeInputLabel='Time: '
							wrapperClassName='date-picker'
						/>
					</FormControl>
				</div>
			);
		case SKELETON:
			return renderSkeleton ? renderSkeleton(field) : null;
		case SELECT:
			return (
				<FormControl>
					<Select
						onValueChange={field.onChange}
						defaultValue={field.value}>
						<FormControl>
							<SelectTrigger className='shad-select-trigger'>
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>
						<SelectContent className='shad-select-content'>
							{props.children}
						</SelectContent>
					</Select>
				</FormControl>
			);
		case TEXTAREA:
			return (
				<FormControl>
					<Textarea
						placeholder={placeholder}
						disabled={props.disabled}
						className='shad-textArea'
						{...field}
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
