import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ComicEffects } from '@features/comics/state/comics.effects';
import { comicsReducer } from '@features/comics/state/comics.reducer';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('comics', comicsReducer),
    EffectsModule.forFeature([ComicEffects]),
    HomeRoutingModule,
  ],
})
export class HomeModule {}
