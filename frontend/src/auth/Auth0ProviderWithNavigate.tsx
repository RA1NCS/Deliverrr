import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

type Props = {
	children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
	// Hook for navigation and environment variables for Auth0 configuration
	const navigate = useNavigate();
	const domain = import.meta.env.VITE_AUTH0_DOMAIN;
	const clientID = import.meta.env.VITE_AUTH0_CLIENT_ID;
	const redirectUri = import.meta.env.VITE_AUTH_CALLBACK_URL;
	const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

	// Validate environment setup
	if (!domain || !clientID || !redirectUri || !audience) {
		throw new Error('Unable To Initialize Authentication');
	}

	// Navigate to '/auth-callback' after successful authentication
	const onRedirectCallback = () => {
		navigate('/auth-callback');
	};

	// Auth0Provider wraps the children with authentication context
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
