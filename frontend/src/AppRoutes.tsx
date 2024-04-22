import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/layout';
import HomePage from './pages/HomePage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import UserProfilePage from './pages/UserProfilePage';

const AppRoutes = () => {
	return (
		<Routes>
			{/* Homepage wrapped inside Layout component */}
			<Route
				path="/"
				element={
					<Layout showHero>
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
				element={
					<Layout>
						<UserProfilePage />
					</Layout>
				}
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
