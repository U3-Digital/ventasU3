import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/controls/modal/modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './components/logged/sidebar/sidebar.component';
import { TopbarComponent } from './components/logged/topbar/topbar.component';
import { InicioComponent } from './components/logged/children/inicio/inicio.component';
import { UsuariosComponent } from './components/logged/children/usuarios/usuarios.component';


@NgModule({
  declarations: [AdminLoginComponent, ModalComponent, SidebarComponent, TopbarComponent, InicioComponent, UsuariosComponent],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
  ]
})
export class AdministradorModule { }
