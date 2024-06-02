export interface User{
    jwt: string;
    FirstName : string;
    LastName : string;
  RefreshToken: string;
  RefreshTokenExpiryTime: Date;
  role: string;
}
