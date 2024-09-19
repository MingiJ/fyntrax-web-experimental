export interface ITokenPayload {
  id: string,
  name: string,
  firstname: string,
  permission: string,
  email: string,
  image: string,
  iat: number,
  accessToken: string,
  session?: string
}