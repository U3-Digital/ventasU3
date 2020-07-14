import { Component, OnInit } from '@angular/core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faCheck} from '@fortawesome/free-solid-svg-icons'
import { CatalogosService } from 'src/app/services/catalogos.service';
import { CatalogoModel } from 'src/app/models/catalogo.model';
import { FormGroup } from '@angular/forms';
import { ClienteModel } from 'src/app/models/cliente.model';
import { ClientesService } from 'src/app/services/clientes.service';
import { ProductoModel } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';
import { createHostListener } from '@angular/compiler/src/core';
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

    opciones: String[] = ['Pedido', 'Cliente', 'Catálogo'];
    childClicked: string;
    icon = faCheck;

    mensajeModal = '';
    showModal = false;
    tipoModal = 'success';

    catalogoSeleccionado: string;

    showAddProduct: boolean = false;

    productos: ProductoModel[] = [];

    constructor(private catalogoService: CatalogosService, private clientesService: ClientesService, private productosService: ProductoService) { 

    
    }

    ngOnInit() {
    }

    recibirProductoAdded($event: ProductoModel) {
        this.showAddProduct = false;
        this.productos.push($event);
        // this.productosService.getProductosPendientes($event).subscribe(
        //     (respuesta) => {
        //         respuesta['productos'].forEach(producto => {
                    
        //             this.productos.push(producto);
        //         });
        //     }, 
        //     (error) => {
        //         console.log(error);
        //     }
        // )
    }

    recibirCatalogo($event: string) {
        // this.productos = [];
        // this.productosService.getProductosPendientes($event).subscribe(
        //     (respuesta) => {
        //         respuesta['productos'].forEach(producto => {
                    
        //             this.productos.push(producto);
        //         });
        //     }, 
        //     (error) => {
        //         console.log(error);
        //     }
        // )

        this.catalogoSeleccionado = $event;
    }

    recibirShowProduct($event) {
        this.showAddProduct = $event;
    }
    recibirChildClicked($event) {
    this.childClicked = $event;
    }

    showForm(nombre) {
        return nombre === this.childClicked;
    }

    recibirClienteEvent($event: FormGroup) {
        
        this.showModal = false;
        let vendedorId = JSON.parse(localStorage.getItem('info-usuario')).id;

        if ($event.valid === true) {
            let cliente: ClienteModel = new ClienteModel();

            cliente.nombres = $event.value.nombres;
            cliente.apellidos = $event.value.apellidos;
            cliente.telefono = $event.value.telefono;
            cliente.email = $event.value.email;
            cliente.adeuda = 0.0;
            cliente.compras = 0.0;
            cliente.vendedor = vendedorId;

            this.clientesService.newCliente(cliente).subscribe(
                (respuesta) => {
                    this.icon = faCheck;
                    this.tipoModal = 'success';
                    this.mensajeModal = 'Cliente añadido exitosamente';
                    this.showModal = true;
                },
                (error) => {
                    console.log(error);
                }
            );

        } else {
            this.icon = faExclamationTriangle;
            this.tipoModal = 'error';
            this.mensajeModal = 'Complete todos los campos para continuar';
            this.showModal = true;
            console.log($event.status);
        }

    }

    recibirCatalogoEvent($event: FormGroup) {

        this.showModal = false;

        if ($event.valid === true) {

            let catalogo: CatalogoModel = new CatalogoModel();
            catalogo.nombre = $event.value.nombre;
            catalogo.ganancia = $event.value.ganancia;

            this.catalogoService.newCatalogo(catalogo).subscribe(
                (respuesta) => {
                    this.icon = faCheck;
                    this.tipoModal = 'success';
                    this.mensajeModal = 'Catálogo añadido exitosamente';
                    this.showModal = true;
                },
                (error) => {
                    console.log(error);
                }
            );

        } else {
            this.icon = faExclamationTriangle;
            this.tipoModal = 'error';
            this.mensajeModal = 'Complete todos los campos para continuar';
            this.showModal = true;
            console.log($event.status);
        }

    }

    recibirProductoEvent($event: FormGroup) {
        this.showModal = false;

        if ($event.valid === true) {

            let producto: ProductoModel = new ProductoModel();
            producto.codigoProducto = $event.value.codigoProducto;
            producto.nombreProducto = $event.value.nombreProducto;
            producto.precioProducto = $event.value.precioProducto;
            producto.cantidadProducto = $event.value.cantidadProducto;
            producto.idCatalogoProducto = $event.value.idCatalogoProducto;
        
            this.productosService.newProducto(producto).subscribe(
                (respuesta) => {
                    console.log(respuesta);
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }
}
