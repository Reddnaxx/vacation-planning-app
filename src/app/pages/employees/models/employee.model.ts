export class EmployeeModel {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public phone: string,
    public department: number,
  ) {}
}
