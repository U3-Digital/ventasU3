import { Component, OnInit } from '@angular/core';

import { CatalogosService } from '../../../services/catalogos.service'; 
import { CatalogoModel } from '../../../models/catalogo.model';
@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

    catalogos: CatalogoModel[] = [];
    opciones: string[] = [];

    constructor(private catalogoService: CatalogosService) {
        this.catalogoService.getCatalogos().subscribe(
            (respuesta) => {

                respuesta['catalogos'].forEach(catalogo => {
                    this.catalogos.push(catalogo);
                });

                this.catalogos.forEach(catalogo => {
                    this.opciones.push(catalogo.nombre);
                })
            },
            (error) => {
                console.log(error);
            }
        );
    }

    ngOnInit() {

    }

    isLast(index) {
        if (index === this.opciones.length - 1) {
            return true;
        } else {
            return false;
        }
    }

}
