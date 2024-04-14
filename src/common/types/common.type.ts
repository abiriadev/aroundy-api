export interface AuthTokenType {
  token: string;
  refreshToken: string;
}

export interface UserTokenBaseType {
  id: number | undefined;
  username: string | undefined;
}
