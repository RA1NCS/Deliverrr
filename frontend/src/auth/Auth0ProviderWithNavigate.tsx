import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

type Props = {
	children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
	// Use the useNavigate hook from React Router for programmatic navigation
	const navigate = useNavigate();

	const domain = import.meta.env.VITE_AUTH0_DOMAIN;
	const clientID = import.meta.env.VITE_AUTH0_CLIENT_ID;
	const redirectUri = import.meta.env.VITE_AUTH_CALLBACK_URL;
	const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

	// Check if all necessary environment variables are provided
	if (!domain || !clientID || !redirectUri || !audience) {
		throw new Error('Unable To Initialize Authentication');
	}

	// Define what happens after Auth0 authenticates the user and redirects back
	const onRedirectCallback = () => {
		navigate('/auth-callback');
	};

	// Provide Auth0 authentication context to the application
	return (
		<Auth0Provider
			domain={domain}
			clientId={clientID}
			authorizationParams={{
				redirect_uri: redirectUri,
				audience,
			}}
			onRedirectCallback={onRedirectCallback}
		>
			{children}
		</Auth0Provider>
	);
};

export default Auth0ProviderWithNavigate;
