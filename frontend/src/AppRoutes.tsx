import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/layout';
import HomePage from './pages/HomePage';
import AuthCallbackPage from './pages/AuthCallbackPage';

const AppRoutes = () => {
	return (
		<Routes>
			{/* Homepage wrapped inside Layout component */}
			<Route
				path="/"
				element={
					<Layout>
						<HomePage />
					</Layout>
				}
			/>
			{/* Handling callback after authentication with Auth0 */}
			<Route
				path="/auth-callback"
				element={<AuthCallbackPage />}
			/>
			{/* Route for a user profile page */}
			<Route
				path="/user-profile"
				element={<span>USER PROFILE PAGE</span>}
			/>
			{/* Error 404 Routes*/}
			<Route
				path="*"
				element={<Navigate to="/" />}
			/>
		</Routes>
	);
};

export default AppRoutes;
