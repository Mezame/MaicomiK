import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FooterPortalService } from '@shared/layouts/primary-layout/footer-portal/footer-portal.service';
import { Observable, filter } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  currentUrl: string;
  footer$!: Observable<TemplateRef<any> | null>;

  @ViewChild('comicListFooter') comicListFooter!: TemplateRef<any>;

  constructor(
    private router: Router,
    private footerPortalService: FooterPortalService
  ) {
    this.currentUrl = '';

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (!!event.url) {
          this.currentUrl = event.url;
        }
      });
  }

  ngOnInit(): void {
    this.footer$ = this.footerPortalService.getFooter();
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}

  setFooter() {
    switch (this.currentUrl) {
      case '/home/comics':
        break;
      default:
    }
  }
}
