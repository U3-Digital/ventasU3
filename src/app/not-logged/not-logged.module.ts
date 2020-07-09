import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotLoggedRoutingModule } from './not-logged-routing.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    NotLoggedRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
      FormsModule,
      ReactiveFormsModule
  ]
})
export class NotLoggedModule { }
