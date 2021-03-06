import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicio.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {

    Servicios: any = [];

    constructor(private serviciosService: ServicioService, private router: Router) {
     }

    ngOnInit() {
        this.Servicios = this.serviciosService.getServicios();
    }

    redirect(ruta: string) {
        console.log(ruta);
        this.router.navigate([ruta]);
    }

}
