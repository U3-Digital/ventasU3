import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotLoggedRoutingModule } from './not-logged-routing.module';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    NotLoggedRoutingModule
  ]
})
export class NotLoggedModule { }
