import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes.tsx';
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'sonner';

/*
 * This part of the application sets up the foundational components and libraries needed to run a React application.
 * 1. `BrowserRouter` (aliased as Router) manages the navigation between different parts of the application using URL paths.
 * 2. `QueryClientProvider` wraps the application to provide a context for managing server data, allowing components to fetch, cache, and update data without directly managing the logic of HTTP requests.
 * 3. `Auth0ProviderWithNavigate` enhances the authentication process, integrating Auth0 for secure and flexible user authentication and routing the user post-login.
 * 4. The `AppRoutes` component defines the routing logic, specifying which component to display based on the URL, creating a navigable structure for the application.
 */

// Configuration for react-query to manage server state in the React application
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

// Initialize the React application and attach it to the root DOM element
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Router>
			<QueryClientProvider client={queryClient}>
				<Auth0ProviderWithNavigate>
					<AppRoutes />
					<Toaster
						visibleToasts={1}
						position="top-right"
						richColors
					/>
				</Auth0ProviderWithNavigate>
			</QueryClientProvider>
		</Router>
	</React.StrictMode>
);
