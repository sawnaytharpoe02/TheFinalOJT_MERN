import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import {
	BrowserRouter as Router,
	Navigate,
	Routes,
	Route,
} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

const App = () => {
	const { user } = useContext(AuthContext);
	return (
		<Router>
			<div>
				<Routes>
					<Route path="/" element={user ? <Home /> : <Register />} />
					<Route
						path="/register"
						element={user ? <Navigate to="/" /> : <Register />}
					/>
					<Route
						path="/login"
						element={user ? <Navigate to="/" /> : <Login />}
					/>
					<Route path="/profile/:username" element={<Profile />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
