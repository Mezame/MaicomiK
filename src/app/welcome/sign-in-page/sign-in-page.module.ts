import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInPageComponent } from './sign-in-page.component';

const routes: Routes = [{ path: '', component: SignInPageComponent }];

@NgModule({
  declarations: [SignInPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SignInPageModule {}
