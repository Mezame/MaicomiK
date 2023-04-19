import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { FooterModule } from '@shared/ui-components/footer/footer.module';
import { IconModule } from '@shared/ui-components/icon/icon.module';
import { LogoModule } from '@shared/ui-components/logo/logo.module';
import { ToolbarModule } from '@shared/ui-components/toolbar/toolbar.module';
import { FullModalLayoutComponent } from './full-modal-layout.component';

@NgModule({
  declarations: [FullModalLayoutComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    ToolbarModule,
    LogoModule,
    IconModule,
    FooterModule,
  ],
  exports: [FullModalLayoutComponent],
})
export class FullModalLayoutModule {}
