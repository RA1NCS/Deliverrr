import { useCreateMyUser } from '@/api/MyUserApi';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallbackPage = () => {
	// Hooks for navigation and user management
	const navigate = useNavigate();
	const { user } = useAuth0();
	const { createUser } = useCreateMyUser();

	// Prevent duplicate user creation
	const hasCreatedUser = useRef(false);

	// Create user once upon authentication and redirect to home
	useEffect(() => {
		if (user?.sub && user?.email && !hasCreatedUser.current) {
			createUser({ auth0Id: user.sub, email: user.email });
			hasCreatedUser.current = true;
		}
		navigate('/');
	}, [createUser, navigate, user]);

	return <>Loading...</>;
};

export default AuthCallbackPage;
