import { Component, OnInit } from '@angular/core';

import { CatalogosService } from '../../../services/catalogos.service'; 
import { CatalogoModel } from '../../../models/catalogo.model';
import { ProductoService} from '../../../services/producto.service';
import { ProductoModel } from '../../../models/producto.model';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

    catalogos: CatalogoModel[] = [];
    opciones: string[] = [];
    productos: ProductoModel[] = [];

    constructor(private catalogoService: CatalogosService, private productoService: ProductoService) {
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

    recibirChildClicked($event) {
        console.log($event);
        // console.log('hola');

        this.productoService.getProductos($event._id).subscribe(

            (respuesta) => {

                this.productos = [];

                respuesta['productos'].forEach(producto => {
                    this.productos.push(producto);
                });
                console.log(this.productos);
            },
            (error) => {
                console.log(error);
            }
        )

    }

    isLast(index) {
        if (index === this.opciones.length - 1) {
            return true;
        } else {
            return false;
        }
    }

}
