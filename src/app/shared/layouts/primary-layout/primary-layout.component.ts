import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-primary-layout',
  templateUrl: './primary-layout.component.html',
  styleUrls: ['./primary-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryLayoutComponent implements AfterViewInit, OnDestroy {
  resizeObserver!: ResizeObserver;

  @ViewChild('toolbar', { read: ElementRef }) toolbar!: ElementRef<HTMLElement>;
  @ViewChild('content') content!: ElementRef<HTMLDivElement>;
  @ViewChild('footer', { read: ElementRef }) footer!: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.setResizeObserver();
  }

  ngOnDestroy(): void {
    this.removeResizeObserver();
  }

  setResizeObserver() {
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

    this.resizeObserver.observe(this.content.nativeElement);
  }

  removeResizeObserver() {
    this.resizeObserver.unobserve(this.content.nativeElement);
  }

  onScroll(event: any) {
    const scrollTop = event.target.scrollTop;
    const toolbarEl = this.toolbar.nativeElement;

    if (scrollTop > 28) {
      this.renderer.addClass(toolbarEl, 'sticky-toolbar');
    } else {
      this.renderer.removeClass(toolbarEl, 'sticky-toolbar');
    }
  }

  logOut() { /* TODO document why this method 'logOut' is empty */ }
}
