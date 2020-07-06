import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [

    {
        path: '',
        loadChildren: './not-logged/not-logged.module#NotLoggedModule'
    },
    {
        path: 'logged',
        loadChildren: './logged/logged.module#LoggedModule'
    },
    { 
        path: 'admin',
        loadChildren: './administrador/administrador.module#AdministradorModule'
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations : []
})
export class AppRoutingModule {}
