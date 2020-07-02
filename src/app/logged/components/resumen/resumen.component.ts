import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

    Categorias: any = [];

    constructor(private _categoriasService: CategoriasService) { 

    }

    ngOnInit() {
        this.Categorias = this._categoriasService.getCategorias();
    }

}
