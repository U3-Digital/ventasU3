import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

    logoutIcon = faSignOutAlt;

    nombre: string = '';
    usuario: any;
    fotoPerfil: string;

    constructor(private auth: AuthService, private router: Router) { 

        this.usuario = JSON.parse(localStorage.getItem('info-usuario'));
        this.nombre = this.usuario.nombre;
        this.fotoPerfil = this.usuario.img;
    }

    ngOnInit() {
    }

    logout () {
        this.auth.logout();
        this.router.navigateByUrl('');
    }

}
