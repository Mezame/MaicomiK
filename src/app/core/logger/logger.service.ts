import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Logger {
  isDevMode: boolean;
  logs: string[];

  log: (message: string) => void = this.info;

  constructor() {
    this.isDevMode = environment.isDevMode;
    this.logs = [];
  }

  error(message: string) {
    if (!this.isDevMode) return;

    console.error(message);
  }

  info(message: string) {
    if (!this.isDevMode) return;

    console.log(message);
  }
}
