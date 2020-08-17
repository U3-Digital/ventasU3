import { Component, OnInit } from '@angular/core';
import { CatalogosService } from 'src/app/services/catalogos.service';

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.css']
})
export class CatalogosComponent implements OnInit {

    idUsuario: string;

    catalogos: any[] = [];
    opcionesCatalogos: any[] = [];
    catalogoSeleccionado: any;
    nombreCatalogo = '';
    gananciaCatalogo = '';

    constructor(private catalogosService: CatalogosService) {
        this.idUsuario = JSON.parse(localStorage.getItem('info-usuario')).id;
        this.catalogosService.getCatalogosPorVendedor(this.idUsuario).subscribe(
            (respuesta: any) => {
                respuesta.catalogos.forEach((catalogo: any) => {
                    this.catalogos.push(catalogo);
                    this.opcionesCatalogos.push(catalogo.nombre);
                });
            },
            (error) => {
                console.log(error);
            }
        );
    }

    ngOnInit(): void {
    }

    onCatalogoSeleccionado($event: any) {
        this.catalogoSeleccionado = $event;

        this.nombreCatalogo = this.catalogoSeleccionado.nombre;
        this.gananciaCatalogo = this.catalogoSeleccionado.ganancia;
    }

}
