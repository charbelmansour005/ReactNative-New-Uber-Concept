export interface User {
  access_token: string | null
  role: string | null
}

export interface UserState {
  user: User | null
}
