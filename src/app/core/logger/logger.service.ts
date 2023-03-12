import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  logs: string[] = [];
  devMode: boolean = true;

  log: (message: string) => void = this.info;

  constructor() {}

  info(message: string) {
    if (!this.devMode) return;

    console.log(message);
  }

  error(message: string) {
    if (!this.devMode) return;

    console.error(message);
  }
}
