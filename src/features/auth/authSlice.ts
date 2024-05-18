import { createAppSlice } from "../../app/createAppSlice"
import type {AuthState, UserCreateDto, UserLoginDto} from "./types"
import { fetchCurrentUser, fetchLogin, fetchRegister} from "./api"


const initialState: AuthState = {
  user: undefined,
  roles: [],
  isAuthenticated: false,
  token: "",
  loginErrorMessage: undefined,
  registerErrorMessage: undefined
}

export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: create => ({

    register: create.asyncThunk(
      async (user: UserCreateDto) => {
        const response = await fetchRegister(user)
        return response
      },
      {
        pending: state => {},
        fulfilled: (state, action) => {
         // state.user = action.payload
        },
        rejected: (state, action) => {
          state.registerErrorMessage = action.error.message;
        },
      },
    ),

    login: create.asyncThunk(
      async (user: UserLoginDto) => {
        const response = await fetchLogin(user);
        return response;
      },
      {
        pending: state => {},
        fulfilled: (state, action) => {
          const { accessToken } = action.payload;
          state.isAuthenticated = true;
          localStorage.setItem('token', accessToken);
          state.token = accessToken;
          state.loginErrorMessage = undefined;
        },
        rejected: (state, action) => {
          state.isAuthenticated = false;
          state.token = undefined;
          state.loginErrorMessage = action.error.message;
        },
      },
    ),

    user: create.asyncThunk(
      async (arg: void) => {
        const response = await fetchCurrentUser();
        return response;
      },
      {
        pending: state => {},
        fulfilled: (state, action) => {
          state.user = action.payload;
        },
        rejected: state => {
          state.isAuthenticated = false;
          state.token = undefined;
        },
      },
    ),
    
    logout: create.reducer(state => {
      state.user = undefined;
      state.token = undefined;
      state.isAuthenticated = false;
    }),
  }),
  selectors: {
    selectUser: userState => userState.user,
    selectRoles: userState => userState.roles,
    selectIsAuthenticated: userState => userState.isAuthenticated,
    selectToken: userState => userState.token,
    selectLoginError: userState => userState.loginErrorMessage,
    selectRegisterError: userState => userState.registerErrorMessage
  },
})

export const { register, login, user, logout } = authSlice.actions

export const { selectUser, selectRoles, selectIsAuthenticated, selectToken, selectLoginError, selectRegisterError } = authSlice.selectors
