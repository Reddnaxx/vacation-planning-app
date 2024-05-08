export default class HistoryModel {
  constructor(
    public id: string,
    public dateStart: string,
    public dateEnd: string,
    public status: string,
    public type: string,
    public content: string,
    public timeOff: string,
  ) {}
}
