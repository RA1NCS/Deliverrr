import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Define a schema for the form data using Zod, setting validation rules for each field
const formSchema = z.object({
	email: z.string().optional(),
	name: z.string().min(1, 'Name is Required'),
	addressLine1: z.string().min(1, 'Address is Required'),
	city: z.string().min(1, 'City is Required'),
	country: z.string().min(1, 'Country is Required'),
});

type UserFormData = z.infer<typeof formSchema>;
type Props = {
	currentUser: User;
	onSave: (userProfileData: UserFormData) => void;
	isLoading: boolean;
};

// Functional component for user profile form
const userProfileForm = ({ onSave, isLoading, currentUser }: Props) => {
	// Initialize form and pre-propulate current user values from database
	const form = useForm<UserFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: currentUser,
	});

	// If the component re-renders and the user changes, the form is re-rendered based on new data
	useEffect(() => {
		form.reset(currentUser);
	}, [currentUser, form]);

	return (
		// Form component handling submission and structure
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSave)}
				className="space-y-4 bg-gray-50 rounded-lg md:p-10 font-poppins"
			>
				{/* Form header */}
				<div>
					<h2 className="text-2xl font-bold">
						User Profile Form
					</h2>
					<FormDescription>
						View and Change your profile
						information here
					</FormDescription>
				</div>

				{/* Email input field, not editable */}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Email
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									disabled
									className="bg-white"
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				{/* Name input field */}
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Name
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									className="bg-white"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Address inputs - Address line, City, and Country in a flexible row layout */}
				<div className="flex flex-col md:flex-row gap-4">
					{/* Address Line 1 input field */}
					<FormField
						control={form.control}
						name="addressLine1"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>
									Address
									Line 1
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										className="bg-white"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* City input field */}
					<FormField
						control={form.control}
						name="city"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>
									City
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										className="bg-white"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Country input field */}
					<FormField
						control={form.control}
						name="country"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>
									Country
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										className="bg-white"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Conditional rendering of LoadingButton or regular Button based on isLoading prop */}
				{isLoading ? (
					<LoadingButton />
				) : (
					<Button
						type="submit"
						className="bg-red-500"
					>
						Submit
					</Button>
				)}
			</form>
		</Form>
	);
};

export default userProfileForm;
