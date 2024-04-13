import { useAuth0 } from '@auth0/auth0-react'
import { Button } from './ui/button'

const MainNav = () => {
	const { loginWithRedirect } = useAuth0()
	return (
		<Button
			variant="ghost"
			className="font-bold hover:text-red-500 hover:big-white font-poppins"
			onClick={async () => await loginWithRedirect()}
		>
			Log In
		</Button>
	)
}

export default MainNav
