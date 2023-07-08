import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpPageComponent } from './sign-up-page.component';

const routes: Routes = [{ path: '', component: SignUpPageComponent }];

@NgModule({
  declarations: [SignUpPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SignUpPageModule {}
