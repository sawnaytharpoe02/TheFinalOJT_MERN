const LoginStart = (userCredentials) => ({
	type: 'LOGIN_START',
});

const LoginSuccess = (user) => ({
	type: 'LOGIN_SUCCESS',
	payload: user,
});

const LoginFailure = (error) => ({
	type: 'LOGIN_FAILURE',
	payload: error,
});

export { LoginStart, LoginSuccess, LoginFailure };
