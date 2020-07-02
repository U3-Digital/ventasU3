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

@NgModule({
  declarations: [MainScreenComponent, BottomNavComponent, PerfilComponent, ResumenComponent, CatalogoComponent, AgregarComponent, TopBarComponent],
  imports: [
    CommonModule,
    LoggedRoutingModule
  ],
  providers: [
      ServicioService,
      CategoriasService
  ]
})
export class LoggedModule { }
