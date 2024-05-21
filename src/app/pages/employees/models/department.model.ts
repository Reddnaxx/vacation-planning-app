export default class DepartmentModel {
  constructor(
    public name: string,
    public id: string,
    public managerId: string,
    public slug: string,
    public parent?: string,
  ) {}
}
