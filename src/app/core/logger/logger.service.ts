import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  logs: string[] = [];
  isDevMode: boolean = environment.isDevMode;

  log: (message: string) => void = this.info;

  constructor() {}

  info(message: string) {
    if (!this.isDevMode) return;

    console.log(message);
  }

  error(message: string) {
    if (!this.isDevMode) return;

    console.error(message);
  }
}
