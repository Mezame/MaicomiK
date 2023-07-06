import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FooterPortalService {
  private footer$: BehaviorSubject<TemplateRef<any> | null>;

  constructor() {
    this.footer$ = new BehaviorSubject<TemplateRef<any> | null>(null);
  }

  clearFooter(): void {
    this.footer$.next(null);
  }

  getFooter(): Observable<TemplateRef<any> | null> {
    return this.footer$.asObservable();
  }

  setFooter(footer: TemplateRef<any>): void {
    this.footer$.next(footer);
  }
}
