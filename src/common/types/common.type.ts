export interface AuthTokenType {
  token: string;
  refreshToken: string;
}

export interface UserTokenBaseType {
  id?: number;
  username?: string;
}
