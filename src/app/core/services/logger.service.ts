import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Logger {
  private isDevMode: boolean;
  private logs: string[];

  info: (message: string) => void = this.log;

  constructor() {
    this.isDevMode = isDevMode();
    this.logs = [];
  }

  error(message: string): void {
    if (!this.isDevMode) return;

    console.error(message);
  }

  log(message: string): void {
    if (!this.isDevMode) return;

    console.log(message);
  }
}
