export class UserModel {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public phone: string,
    public department: string,
    public role: string,
    public isActive: boolean,
  ) {}
}
