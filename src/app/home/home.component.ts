import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { FooterPortalService } from '@shared/layouts/footer-portal/footer-portal.service';
import { Observable, filter } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  currentUrl: string;
  isComicListRoute!: boolean;
  isComicDetailRoute!: boolean;
  layout!: string;
  footer$!: Observable<Readonly<TemplateRef<any>> | null>;

  constructor(
    private router: Router,
    private footerPortalService: FooterPortalService
  ) {
    this.currentUrl = '';

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        let segmentsCount: number;

        this.currentUrl = event.url;
        segmentsCount = this.getSegmentsCount(this.currentUrl);

        if (segmentsCount < 3) {
          this.isComicListRoute = true;
        } else {
          this.isComicListRoute = false;
        }

        if (segmentsCount == 3) {
          this.isComicDetailRoute = true;
        } else {
          this.isComicDetailRoute = false;
        }

        this.setLayout();
      });
  }

  ngOnInit(): void {
    this.setLayout();

    this.footer$ = this.footerPortalService.getFooter();
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}

  setLayout() {
    if (
      this.isComicListRoute ||
      (this.isComicDetailRoute && this.currentUrl !== '/home/comics/add-comic')
    ) {
      this.layout = 'primaryLayout';
    } else {
      this.layout = 'fullModalLayout';
    }
  }

  getBackUrl() {
    let currentUrlIndex: number;
    let backUrl: string;

    currentUrlIndex = this.currentUrl.lastIndexOf('/');
    backUrl = this.currentUrl.slice(0, currentUrlIndex);

    return backUrl;
  }

  getSegmentsCount(url: string) {
    let segmentsCount: number;

    segmentsCount = (url.match(new RegExp('/', 'g')) || []).length;

    return segmentsCount;
  }
}
