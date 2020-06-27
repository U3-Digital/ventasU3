import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicio.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {

    Servicios: any = [];

    constructor(private _serviciosService: ServicioService) {
        
     }

    ngOnInit() {     
        this.Servicios = this._serviciosService.getServicios();
      
    }

}
