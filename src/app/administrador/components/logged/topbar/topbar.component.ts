import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit, AfterViewInit {

    @Output() presionado = new EventEmitter<any>();
    @ViewChild('btnTopbar', {}) btnTopbar: ElementRef;
    
    sidebarIcon = "../../../../assets/img/sidebar.png";
    logoutIcon = faSignOutAlt;
    nombre: string;
    usuario: any;

    constructor(private auth: AuthService, private router: Router) {
        this.usuario = JSON.parse(localStorage.getItem('info-usuario'));
        this.nombre = this.usuario.nombre;    
    }

    ngAfterViewInit(): void {
        this.btnTopbar.nativeElement.addEventListener('click', this.clicked);
    }

    ngOnInit(): void {
    }

    clicked = (event: any) =>{
        this.presionado.emit();
    }


    logout() {
        this.auth.logout();
        this.router.navigateByUrl('');
    }
}
