import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from 'react-query';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
	auth0Id: String;
	email: String;
};

export const useCreateMyUser = () => {
	const { getAccessTokenSilently } = useAuth0();

	// This function sends user data to the server to create a new user account
	const createMyUserRequest = async (user: CreateUserRequest) => {
		// Getting an access token to authorize the API request
		const accessToken = await getAccessTokenSilently();
		const response = await fetch(`${API_BASE_URL}/api/my/user`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`, // The token proves the request is allowed
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		// If the server responds with an error, we throw an error
		if (!response.ok) {
			throw new Error('Failed to create user');
		}
	};

	// React Query's useMutation is used here to manage the user creation process
	const {
		mutateAsync: createUser,
		isLoading,
		isError,
		isSuccess,
	} = useMutation(createMyUserRequest);

	return {
		createUser,
		isLoading,
		isError,
		isSuccess,
	};
};
