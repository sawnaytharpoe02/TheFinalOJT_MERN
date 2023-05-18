import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router';

const RedirectIfLoggedIn = () => {
	const { user } = useContext(AuthContext);

	if (user) {
		return <Navigate to="/" />;
	}
	return null;
};

export default RedirectIfLoggedIn;
