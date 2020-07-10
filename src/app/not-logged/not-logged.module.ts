import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotLoggedRoutingModule } from './not-logged-routing.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/controls/modal/modal.component'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [LoginComponent, ModalComponent],
  imports: [
    CommonModule,
    NotLoggedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
      FormsModule,
      ReactiveFormsModule
  ]
})
export class NotLoggedModule { }
