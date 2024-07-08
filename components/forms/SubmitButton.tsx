import Image from "next/image";
import { Button } from "../ui/button";

type SubmitButtonProps = {
	isLoading: boolean;
	className?: string;
	children: React.ReactNode;
};

const SubmitButton = ({
	isLoading,
	className,
	children,
}: SubmitButtonProps) => {
	return (
		<Button
			type='submit'
			disabled={isLoading}
			className={className ?? "shad-primary-btn w-full"}>
			{isLoading ? (
				<div className='flex items-center gap-4'>
					<Image
						src='/assets/icons/loader.svg'
						width={24}
						height={24}
						alt=''
						className='animate-spin'
					/>
				</div>
			) : (
				children
			)}
		</Button>
	);
};

export default SubmitButton;
