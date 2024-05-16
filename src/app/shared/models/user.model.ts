export default class UserModel {
  constructor(
    public id: string,
    public uid: string,
    public firstName: string,
    public surname: string,
    public lastName: string,
    public email: string,
    public department: string,
    public role: string,
    public isActive: boolean,
    public phone?: string,
  ) {}
}
