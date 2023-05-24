const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case 'LOGIN_FAILURE':
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case 'FOLLOW':
      return {
        ...state,
        user: {
          ...state.user.user,
          followings: [...state.user.user.followings, action.payload],
        },
      };
    case 'UNFOLLOW':
      return {
        ...state,
        user: {
          ...state.user.user,
          followings: state.user.user.followings.filter(
            (following) => following !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};

export default AuthReducer;
