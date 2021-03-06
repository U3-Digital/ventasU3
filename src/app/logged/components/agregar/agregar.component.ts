import { Component, OnInit } from '@angular/core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faCheck} from '@fortawesome/free-solid-svg-icons';
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

    idVendedor: string;

    opciones: string[] = ['Pedido', 'Cliente', 'Catálogo', 'Abono'];
    childClicked: string;
    icon = faCheck;

    mensajeModal = '';
    showModal = false;
    tipoModal = 'success';

    catalogoSeleccionado: string;

    showAddProduct = false;

    productos: ProductoModel[] = [];

    constructor(private catalogoService: CatalogosService, private clientesService: ClientesService,
                private productosService: ProductoService) {
        this.idVendedor = JSON.parse(localStorage.getItem('info-usuario')).id;
    }

    ngOnInit() {
    }

    recibirProductoAdded($event: ProductoModel) {
        this.showAddProduct = false;
        this.productos.push($event);
    }

    recibirCatalogo($event: string) {
        this.productos = [];
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

        if ($event.valid === true) {
            const cliente: ClienteModel = new ClienteModel();

            cliente.nombres = $event.value.nombres;
            cliente.apellidos = $event.value.apellidos;
            cliente.telefono = $event.value.telefono;
            cliente.email = $event.value.email;
            cliente.adeuda = 0.0;
            cliente.compras = 0.0;
            cliente.vendedor = this.idVendedor;

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

            const catalogo: CatalogoModel = new CatalogoModel();
            catalogo.nombre = $event.value.nombre;
            catalogo.ganancia = $event.value.ganancia;

            const parametros = {
                idVendedor: this.idVendedor,
                catalogo
            };

            this.catalogoService.newCatalogo(parametros).subscribe(
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


    recibirSubmitPedido($event: any) {
        this.showModal = false;
        if ($event.ok === true) {
            this.productos = [];


            const info = {
                idCliente: $event.idCliente,
                compras: $event.total,
                adeuda: $event.total
            };

            this.clientesService.updateComprasAdeudaCliente(info)
            .subscribe(
                (respuesta) => {

                    this.showModal = true;
                    this.tipoModal = 'success';
                    this.icon = faCheck;
                    this.mensajeModal = '¡Pedido añadido exitosamente!';

                    // console.log(respuesta);
                },
                (error) => {
                    console.log(error);
                }
            );

        } else {
            this.showModal = true;
            this.tipoModal = 'error';
            this.icon = faExclamationTriangle;
            this.mensajeModal = 'Complete todos los campos para continuar';
        }
        console.log(this.showModal);
    }

    recibirAbonoSubmit($event) {
        this.showModal = false;

        this.showModal = true;
        this.tipoModal = $event.tipo;
        if (this.tipoModal === 'error') {
            this.icon = faExclamationTriangle;
        } else {
            this.icon = faCheck;
        }
        this.mensajeModal = $event.mensaje;
    }

    dialogDismiss($event) {
        this.showModal = false;
    }
}
