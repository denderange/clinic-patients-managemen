import z from "zod";

export const UserFormValidation = z.object({
	username: z
		.string()
		.min(2, "Name is too short")
		.max(50, "Please, enter shorter name"),
	email: z.string().email("Not valid email address"),
	phone: z
		.string()
		.refine((phone) => /^\+\d{10,15}$/.test(phone), "Not valid phone number"),
});
