import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

import { FooterModule } from '@shared/ui-components/footer/footer.module';
import { IconModule } from '@shared/ui-components/icon/icon.module';
import { LogoModule } from '@shared/ui-components/logo/logo.module';
import { ToolbarModule } from '@shared/ui-components/toolbar/toolbar.module';
import { PrimaryLayoutComponent } from './primary-layout.component';

@NgModule({
  declarations: [PrimaryLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    ToolbarModule,
    LogoModule,
    IconModule,
    FooterModule,
  ],
  exports: [PrimaryLayoutComponent],
})
export class PrimaryLayoutModule {}
