import { Injectable, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterPortalService {
  private footer: Subject<Readonly<TemplateRef<any>> | null>;

  constructor() {
    this.footer = new Subject();
  }

  setFooter(footer: TemplateRef<any>) {
    this.footer.next(footer);
  }

  getFooter() {
    return this.footer.asObservable();
  }

  clearFooter() {
    this.footer.next(null);
  }
}
