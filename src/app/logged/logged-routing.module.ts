import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ResumenComponent } from './components/resumen/resumen.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { AgregarComponent } from './components/agregar/agregar.component';
import { AuthUserGuard } from '../guards/auth-user.guard';

const routes: Routes = [

    {
        path: '',
        component: BottomNavComponent,
        canActivate: [AuthUserGuard],
        children: [
            {
                path: 'inicio',
                component: MainScreenComponent
            },
            {
                path: 'perfil',
                component: PerfilComponent
            }, 
            {
                path: 'resumen',
                component: ResumenComponent
            },
            {
                path: 'catalogos',
                component: CatalogoComponent
            },
            {
                path: 'agregar',
                component: AgregarComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'inicio'
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations : []
})
export class LoggedRoutingModule {}
