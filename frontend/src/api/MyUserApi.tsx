import { User } from '@/types';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Type Definitions
type CreateUserRequest = {
	auth0Id: String;
	email: String;
};

type UpdateMyUserRequest = {
	name: string;
	addressLine1: string;
	city: string;
	country: string;
};

// Mutation Functions

// Defines a custom hook to fetch current user data using Auth0 and React Query
export const useGetMyUser = () => {
	const { getAccessTokenSilently } = useAuth0();

	// Fetch user data from API with authorization
	const getMyUserRequest = async (): Promise<User> => {
		const accessToken = await getAccessTokenSilently();
		try {
			const response = await fetch(
				`${API_BASE_URL}/api/my/user`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${accessToken}`,
						'Content-Type':
							'application/json',
					},
				}
			);

			if (!response.ok) {
				throw new Error('Failed To Fetch User');
			}

			return response.json();
		} catch (e) {
			console.error('Fetch Error:', e);
			throw e;
		}
	};

	// Use React Query for fetching and caching the user data
	const {
		data: currentUser,
		isLoading,
		error,
	} = useQuery('fetchCurrentUser', getMyUserRequest);

	// Display a toast notification on error
	if (error) {
		toast.error(error.toString());
	}

	return { currentUser, isLoading };
};

// Custom hook for creating a new user
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
			throw new Error('Failedt To Create User');
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

// Defines a custom hook for updating user details
export const useUpdateMyUser = () => {
	const { getAccessTokenSilently } = useAuth0();

	// Function to send the update request to the server
	const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
		// Retrieve an access token and use the token for authorization
		const accessToken = await getAccessTokenSilently();
		const response = await fetch(`${API_BASE_URL}/api/my/user`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});

		if (!response.ok) {
			throw new Error('Failed To Update User');
		}

		return response.json();
	};

	// Use react-query's useMutation to manage the state of the update operation
	const {
		mutateAsync: updateUser,
		isLoading,
		isSuccess,
		error,
		reset,
	} = useMutation(updateMyUserRequest);

	// Render successful toast upon success
	if (isSuccess) {
		toast.success('User Profile Updated!');
	}

	// Render error toast upon error
	if (error) {
		toast.error(error.toString());
		reset();
	}

	return { updateUser, isLoading };
};
