export interface ILoggerService {
  log(message: string): void;

  success(message: string): void;

  error(error: Error): void;

  sendLogs(withoutCheck?: boolean): void;
}
