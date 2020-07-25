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
    }

    ngOnInit() {

    }

    recibirChildClicked($event) {

    }

    isLast(index) {
        if (index === this.opciones.length - 1) {
            return true;
        } else {
            return false;
        }
    }

}
