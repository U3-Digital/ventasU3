import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ResumenComponent } from './components/resumen/resumen.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { AgregarComponent } from './components/agregar/agregar.component';
import { AuthUserGuard } from '../guards/auth-user.guard';
import { ClientesComponent } from './components/clientes/clientes.component';

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
                path: 'pedidos',
                component: PedidosComponent
            },
            {
                path: 'agregar',
                component: AgregarComponent
            },
            {
                path: 'clientes',
                component: ClientesComponent
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
