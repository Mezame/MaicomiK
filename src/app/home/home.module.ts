import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ComicEffects } from '@features/comics/state/comics.effects';
import { comicsReducer } from '@features/comics/state/comics.reducer';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PrimaryLayoutModule } from '@shared/layouts/primary-layout/primary-layout.module';
import { FooterPortalModule } from '@shared/layouts/primary-layout/footer-portal/footer-portal.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('comics', comicsReducer),
    EffectsModule.forFeature([ComicEffects]),
    HomeRoutingModule,
    PrimaryLayoutModule,
    MatButtonModule,
    MatIconModule,
    FooterPortalModule
  ],
})
export class HomeModule {}
