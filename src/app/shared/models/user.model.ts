export default class UserModel {
  constructor(
    public email?: string,
    public firstName?: string,
    public lastName?: string,
    public password?: string,
    public department?: string,
    public isManager?: boolean
  ) { }
}
