import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Logger {
  isDevMode: boolean;
  logs: string[];

  log: (message: string) => void = this.info;

  constructor() {
    this.isDevMode = isDevMode();
    this.logs = [];
  }

  error(message: string): void {
    if (!this.isDevMode) return;

    console.error(message);
  }

  info(message: string): void {
    if (!this.isDevMode) return;

    console.log(message);
  }
}
