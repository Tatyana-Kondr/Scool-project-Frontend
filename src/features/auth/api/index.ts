import {
  AuthState,
  LoginResponse,
  User,
  UserCreateDto,
  UserLoginDto,
  UserUpdateDto,
} from "../types"

export interface PasswordDto {
  oldPassword: string
  newPassword: string
}

export async function fetchRegister(
  userCreateDto: UserCreateDto,
): Promise<User> {
  const res = await fetch("/api/account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
    },
    body: JSON.stringify(userCreateDto),
  })
  // if (!res.ok) {
  //   const{message}= await res.json()
  //   throw new Error(message)
  // }
  if (res.status === 409) {
    throw new Error("Conflict: User already exists.")
  }

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || "Failed to register user.")
  }

  return res.json()
}

export async function fetchLogin(
  userLoginDto: UserLoginDto,
): Promise<LoginResponse> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
    },
    body: JSON.stringify(userLoginDto),
  })

  if (!res.ok) {
    const { message } = await res.json()
    throw new Error(message)
  }
  return res.json()
}
export async function fetchCurrentUser(): Promise<User> {
  const res = await fetch("/api/account", {
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  if (!res.ok) {
    throw new Error("Login failed")
  }
  return res.json()
}
export async function fetchUser(author: string): Promise<User> {
  const res = await fetch(`/api/account/${author}`, {
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
    },
  })
  if (!res.ok) {
    throw new Error("Author does't exsist")
  }
  return res.json()
}

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch("/api/account/users", {
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })

  return res.json()
}

interface ServerDeleteUserResponse extends User {
  isDeleted: boolean
}

export async function fetchDeleteUser(
  id: number,
): Promise<ServerDeleteUserResponse> {
  const res = await fetch(`/api/account/user/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  return res.json()
}

export async function fetchUpdateUser(
  userUpdateDto: UserUpdateDto,
  id: number,
): Promise<User> {
  const res = await fetch(`/api/account/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(userUpdateDto),
  })
  if (!res.ok) {
    throw new Error("Failed to update user")
  }
  return res.json()
}
// export async function fetchChangePassword(newPassword: string) {
//   try {
//     const response = await fetch("/api/account/password", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         accept: "*/*",
//         authorization: `Bearer ${localStorage.getItem("token")}`,
//         "X-Password": newPassword,
//       },
//       credentials: "include", // чтобы куки сессии были отправлены
//     })

//     if (response.status === 204) {
//       alert("Password changed successfully")
//     } else {
//       alert("Failed to change password")
//     }
//   } catch (error) {
//     console.error("Error:", error)
//     alert("Error changing password")
//   }
// }

export async function fetchPassword(paswordDto:PasswordDto): Promise<void> {
  const res = await fetch(`/api/account/password`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json", 
      "Accept": "*/*",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(paswordDto)
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to update password: ${errorText}`);
  }
}
