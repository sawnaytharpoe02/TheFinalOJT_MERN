import { useContext, useRef } from 'react';
import './login.css';
import { AuthContext } from '../../context/AuthContext';
import { loginCall } from '../../apiCalls';
import { CircularProgress } from '@mui/material';

const Login = () => {
	const email = useRef();
	const password = useRef();

	const { user, isFetching, error, dispatch } = useContext(AuthContext);

	const handleSubmit = (e) => {
		e.preventDefault();
		loginCall(
			{ email: email.current.value, password: password.current.value },
			dispatch
		);
	};

	return (
		<div className="login">
			<div className="loginWrapper">
				<div className="loginLeft">
					<h3 className="loginLogo">Scmsocial</h3>
					<span className="loginDesc">
						Connect with friends and the world around you on Scmsocial.
					</span>
				</div>
				<div className="loginRight">
					<form className="loginBox" onSubmit={handleSubmit}>
						<input
							type="email"
							placeholder="Email"
							className="loginInput"
							required
							ref={email}
						/>
						<input
							type="password"
							placeholder="Password"
							className="loginInput"
							minLength={6}
							required
							ref={password}
						/>
						<button className="loginButton" type="submit" disabled={isFetching}>
							{isFetching ? (
								<CircularProgress color="inherit" size="20px" />
							) : (
								'Log In'
							)}
						</button>
						<span className="loginForgot">Forgot Password?</span>
						<button className="loginRegisterButton">
							{isFetching ? (
								<CircularProgress color="inherit" size="20px" />
							) : (
								'Create New Account'
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
