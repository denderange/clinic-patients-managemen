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
	return (
		<Input
			type='text'
			placeholder='Full Name'
		/>
	);
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
