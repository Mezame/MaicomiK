import { Directive, Input, TemplateRef } from '@angular/core';
import { FooterPortalService } from './footer-portal.service';

@Directive({
  selector: '[appFooterPortal]',
})
export class FooterPortalDirective {
  @Input('appFooterPortal') set footer(template: TemplateRef<any>) {
    if (template) {
      this.footerPortalService.setFooter(template);
    }
  }

  constructor(private footerPortalService: FooterPortalService) {}

  ngOnDestroy(): void {
    this.footerPortalService.clearFooter();
  }
}
