import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
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
export class PrimaryLayoutComponent implements OnInit, AfterViewInit {
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
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const deviceHeight = window.innerHeight;
    const maxBodyContent = deviceHeight - 80 - 56;
    const bodyEl = this.body.nativeElement;
    const footerEl = this.footer.nativeElement;
    const observer = new ResizeObserver((entries) => {
      const height = entries[0].contentRect.height;

      if (height > maxBodyContent) {
        this.renderer.addClass(footerEl, 'sticky-footer');
      } else {
        this.renderer.removeClass(footerEl, 'sticky-footer');
      }
    });

    observer.observe(bodyEl);
  }

  logOut() {}
}
