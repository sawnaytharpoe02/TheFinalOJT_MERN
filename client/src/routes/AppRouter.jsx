import Home from '../pages/home/Home';
import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import Profile from '../pages/profile/Profile';
import { createBrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AppRouter = () => {
	const { user } = useContext(AuthContext);

	const router = createBrowserRouter([
		{
			path: '/',
			element: user ? <Navigate to="/" /> : <Home />,
		},
		{
			path: '/register',
			element: user ? <Navigate to="/" /> : <Register />,
		},
		{
			path: '/login',
			element: user ? <Navigate to="/" /> : <Login />,
		},
		{
			path: '/profile/:username',
			element: <Profile />,
		},
	]);

	return router;
};
export default AppRouter;
