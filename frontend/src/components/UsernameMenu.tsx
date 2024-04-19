import { useAuth0 } from '@auth0/auth0-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { CircleUserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from './ui/separator';
import { Button } from './ui/button';

const UsernameMenu = () => {
	const { user, logout } = useAuth0();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-red-500 gap-2 font-poppins">
				<CircleUserRound className="text-red-500 font-poppins" />
				{user?.email}
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				<DropdownMenuItem>
					<Link
						to="/user-profile"
						className="font-bold hover:text-red-500 font-poppins"
					>
						User Profile
					</Link>
				</DropdownMenuItem>
				<Separator />
				<DropdownMenuItem>
					<Button
						onClick={() => logout()}
						className="flex flex-1 font-bold bg-red-500 font-poppins"
					>
						Log Out
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UsernameMenu;
