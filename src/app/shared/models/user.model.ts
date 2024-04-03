export default class UserModel {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public department: string,
    public phone?: string,
    public isManager?: boolean,
  ) {}
}
