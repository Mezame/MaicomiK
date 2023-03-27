import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-primary-layout',
  templateUrl: './primary-layout.component.html',
  styleUrls: ['./primary-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryLayoutComponent implements AfterViewInit, OnDestroy {
  resizeObserver!: ResizeObserver;

  @ViewChild('toolbar') toolbar!: MatToolbar;
  @ViewChild('body') body!: ElementRef<HTMLDivElement>;
  @ViewChild('footer') footer!: ElementRef<HTMLDivElement>;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const scrollTop = event.target.documentElement.scrollTop;
    const toolbarEl = this.toolbar._elementRef.nativeElement;

    if (scrollTop > 22) {
      this.renderer.addClass(toolbarEl, 'sticky-toolbar');
    } else {
      this.renderer.removeClass(toolbarEl, 'sticky-toolbar');
    }
  }

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const deviceHeight = window.innerHeight;
    const maxBodyContent = deviceHeight - 80 - 56;
    const footerEl = this.footer.nativeElement;

    this.resizeObserver = new ResizeObserver((entries) => {
      const height = entries[0].contentRect.height;

      if (height > maxBodyContent) {
        this.renderer.addClass(footerEl, 'sticky-footer');
      } else {
        this.renderer.removeClass(footerEl, 'sticky-footer');
      }
    });

    this.resizeObserver.observe(this.body.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.unobserve(this.body.nativeElement);
  }

  logOut() {}
}
