export default class HistoryModel {
  constructor(
    public id: string,
    public datestart: string,
    public dateend: string,
    public status: string,
    public type: string,
    public content: string,
  ) {}
}
