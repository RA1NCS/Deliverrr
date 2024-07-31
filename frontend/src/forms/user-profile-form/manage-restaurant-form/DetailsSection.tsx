import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const DetailsSection = () => {
	return (
		<div className="space-y-2">
			<div>
				<h2 className="text-2xl font-bold">Details</h2>
				<FormDescription>Enter the restaurant details</FormDescription>
			</div>
			<FormField
				control={control}
				name="restaurantName"
				render={({ field }) => {
					return (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
							    <Input {...field} className='bg-white'/>
							</FormControl>
						</FormItem>
					);
				}}
			/>
		</div>
	);
};

export default DetailsSection;
