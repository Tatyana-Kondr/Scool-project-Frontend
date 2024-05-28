export interface User {
  id: number
  fullName: string
  avatar: string
  login: string
  email: string
  website: string
  phone: string
  telegram: string
  role: string[]
}
export interface UserCreateDto {
  fullName: string
  login: string
  password: string
  email: string
  website: string
  phone: string
  telegram: string
}
export interface UserLoginDto {
  login: string
  password: string
}

export interface UserUpdateDto {
  fullName: string
  telegram: string
  email: string
  website: string
  phone: string
}

export interface AuthState {
  user?: User
  userList: User[]
  roles: string[]
  isAuthenticated: boolean
  token?: string
  loginErrorMessage?: string
  registerErrorMessage?: string
}
export interface LoginResponse {
  accessToken: string
  refreshToken: string
}
