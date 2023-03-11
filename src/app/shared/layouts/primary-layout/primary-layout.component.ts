import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
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
export class PrimaryLayoutComponent {
  @ViewChild('toolbar') toolbar!: MatToolbar;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const scrollTop = event.target.documentElement.scrollTop;

    if (scrollTop > 22) {
      this.renderer.addClass(this.toolbar._elementRef.nativeElement, 'sticky');
    } else {
      this.renderer.removeClass(
        this.toolbar._elementRef.nativeElement,
        'sticky'
      );
    }
  }

  constructor(private renderer: Renderer2) {}

  logOut() {}
}
