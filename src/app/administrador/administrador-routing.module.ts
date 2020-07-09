import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { InicioComponent } from './components/inicio/inicio.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AuthGuard } from '../guards/auth.guard';
const routes: Routes = [
    {
        path: '',
        component: AdminLoginComponent

    }, 
    {
        path: 'inicio',
        component: InicioComponent,
        canActivate: [ AuthGuard ]
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