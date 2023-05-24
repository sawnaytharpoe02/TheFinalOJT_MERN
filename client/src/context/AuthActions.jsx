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

const Follow = (userId) => ({
  type: 'FOLLOW',
  payload: userId,
});

const Unfollow = (userId) => ({
  type: 'UNFOLLOW',
  payload: userId,
});

export { LoginStart, LoginSuccess, LoginFailure, Follow, Unfollow };
