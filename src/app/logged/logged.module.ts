import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { LoggedRoutingModule } from './logged-routing.module';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ResumenComponent } from './components/resumen/resumen.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { AgregarComponent } from './components/agregar/agregar.component';
import { ServicioService } from '../services/servicio.service';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { CategoriasService } from '../services/categorias.service';
import { DropdownComponent } from './components/controls/dropdown/dropdown.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgregarPedidoComponent } from './components/agregar/components/agregar-pedido/agregar-pedido.component';
import { AgregarClienteComponent } from './components/agregar/components/agregar-cliente/agregar-cliente.component';
@NgModule({
  declarations: [MainScreenComponent, BottomNavComponent, PerfilComponent, ResumenComponent, CatalogoComponent, AgregarComponent, TopBarComponent, DropdownComponent, AgregarPedidoComponent, AgregarClienteComponent],
  imports: [
    CommonModule,
    LoggedRoutingModule,
    FontAwesomeModule
  ],
  providers: [
      ServicioService,
      CategoriasService
  ]
})
export class LoggedModule { }
