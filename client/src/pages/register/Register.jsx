import './register.css';
import { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Register = () => {
	const username = useRef();
	const email = useRef();
	const password = useRef();
	const confirmPassword = useRef();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (confirmPassword.current.value !== password.current.value) {
			confirmPassword.current.setCustomValidity(`Password don't match.`);
		} else {
			const user = {
				username: username.current.value,
				email: email.current.value,
				password: password.current.value,
			};
			try {
				await axios.post('http://localhost:8800/api/auth/register', user);
				navigate('/login');
			} catch (err) {
				console.log(err);
			}
		}
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
					<form className="registerBox" onSubmit={handleSubmit}>
						<input
							placeholder="Username"
							type="text"
							className="loginInput"
							ref={username}
							required
						/>
						<input
							placeholder="Email"
							type="email"
							className="loginInput"
							ref={email}
							required
						/>
						<input
							placeholder="Password"
							type="password"
							className="loginInput"
							minLength={6}
							ref={password}
							required
						/>
						<input
							placeholder="Confirm Password"
							type="password"
							className="loginInput"
							ref={confirmPassword}
							required
						/>
						<button className="loginButton" type="submit">
							Sign Up
						</button>
						<button
							className="loginRegisterButton"
							onClick={() => {
								navigate('/login');
							}}>
							Log Into Account
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
