import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Logger {
  isDevMode: boolean;
  logs: string[];

  constructor() {
    this.isDevMode = environment.isDevMode;
    this.logs = [];
  }

  log: (message: string) => void = this.info;

  error(message: string) {
    if (!this.isDevMode) return;

    console.error(message);
  }

  info(message: string) {
    if (!this.isDevMode) return;

    console.log(message);
  }
}
