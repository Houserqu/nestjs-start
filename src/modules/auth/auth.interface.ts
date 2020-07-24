export interface JwtPayload {
  userId: number;

  phone: string;

  nickname: string;

  exp?: number;

  iat?: number
}
