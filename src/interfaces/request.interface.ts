export class CusRequest extends Request {
  user: {
    id: number,
    familyName: string,
    callingName: string,
    gender: string,
    username: string,
    createdAt: string,
    updatedAt: string,
    roleId: number
  }
}