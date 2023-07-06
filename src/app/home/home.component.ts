import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { FooterPortalService } from '@shared/layouts/footer-portal/footer-portal.service';
import { Observable, filter } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  footer$!: Observable<TemplateRef<any> | null>;
  currentUrl!: string;
  isComicListRoute!: boolean;
  isComicDetailRoute!: boolean;
  layout!: string;

  constructor(
    private footerPortalService: FooterPortalService,
    private router: Router
  ) {
    this.setRouterEvents();
  }

  ngOnInit(): void {
    this.setInitialValues();
  }

  getBackUrl(): string {
    let currentUrlIndex: number;
    let backUrl: string;

    currentUrlIndex = this.currentUrl.lastIndexOf('/');
    backUrl = this.currentUrl.slice(0, currentUrlIndex);

    return backUrl;
  }

  private onRouterEvent(event: any): void {
    this.currentUrl = this.router.url;

    this.layout = event?.snapshot?.firstChild?.firstChild?.data['layout'];
  }

  private setInitialValues(): void {
    this.footer$ = this.footerPortalService.getFooter();
  }

  private setRouterEvents(): void {
    this.router.events
      .pipe(filter((event) => event instanceof ActivationEnd))
      .subscribe((event) => {
        this.onRouterEvent(event);
      });
  }
}
