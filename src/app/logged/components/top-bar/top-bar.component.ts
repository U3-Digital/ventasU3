import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

    ruta = 'http://localhost:3000/';

    logoutIcon = faSignOutAlt;

    nombre: string;
    idUsuario: any;
    fotoPerfil: string;

    constructor(private auth: AuthService, private router: Router, private usuariosService: UsuariosService) {

        this.idUsuario = JSON.parse(localStorage.getItem('info-usuario')).id;

        this.usuariosService.getSelfUsuario(this.idUsuario).subscribe(
            (respuesta: any) => {
                this.nombre = respuesta.usuarioDB.nombre;
                this.fotoPerfil = `${this.ruta}${respuesta.usuarioDB.img}`;
            },
            (error) => {
                console.log(error);
            }
        );

       /*  this.nombre = this.usuario.nombre;
        this.fotoPerfil = this.usuario.img; */
    }

    ngOnInit() {
    }

    logout() {
        this.auth.logout();
        this.router.navigateByUrl('');
    }

}
