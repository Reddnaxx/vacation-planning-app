export class EmployeeModel {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public phone: string,
    public department: string,
    public isActive: boolean,
  ) {}
}
