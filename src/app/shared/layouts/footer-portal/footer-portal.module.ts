import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterPortalComponent } from './footer-portal.component';
import { FooterPortalDirective } from './footer-portal.directive';



@NgModule({
  declarations: [
    FooterPortalComponent,
    FooterPortalDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FooterPortalComponent,
    FooterPortalDirective
  ],
})
export class FooterPortalModule { }
