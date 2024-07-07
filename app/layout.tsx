import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";

const fontMontserrat = Montserrat({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "Clinic patients management",
	description: "Patients management system",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={cn(
					fontMontserrat.variable,
					"min-h-screen, bg-dark-300 font-sans antialiased"
				)}>
				<ThemeProvider
					attribute='class'
					defaultTheme='dark'>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
