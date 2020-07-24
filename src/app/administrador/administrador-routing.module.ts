import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SidebarComponent } from './components/logged/sidebar/sidebar.component';
import { InicioComponent } from './components/logged/children/inicio/inicio.component';
import { UsuariosComponent } from './components/logged/children/usuarios/usuarios.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AuthAdminGuard } from '../guards/auth-admin.guard';
const routes: Routes = [
    {
        path: '',
        component: AdminLoginComponent

    }, 
    {
        path: 'logged',
        component: SidebarComponent,
        canActivate: [ AuthAdminGuard ],
        children: [
            {
                path: 'inicio',
                component: InicioComponent
            },
            {
                path: 'usuarios',
                component: UsuariosComponent
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
export class AdministradorRoutingModule {}