import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [

    {
        path: '',
        loadChildren: () => import('./not-logged/not-logged.module').then(m => m.NotLoggedModule)
    },
    {
        path: 'logged',
        loadChildren: () => import('./logged/logged.module').then(m => m.LoggedModule)
    },
    {
        path: 'admin',
        loadChildren: () => import('./administrador/administrador.module').then(m => m.AdministradorModule)
    },
    {
        path: '**',
        redirectTo: ''
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations : []
})
export class AppRoutingModule {}
