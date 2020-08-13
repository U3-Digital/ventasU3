import { Component, OnInit, Input, Output, EventEmitter, HostListener, DoCheck } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'; 

import { CatalogosService } from 'src/app/services/catalogos.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { PedidosService } from 'src/app/services/pedidos.service'; 
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PedidoModel } from 'src/app/models/pedido.model';

@Component({
  selector: 'app-agregar-pedido',
  templateUrl: './agregar-pedido.component.html',
  styleUrls: ['./agregar-pedido.component.css']
})
export class AgregarPedidoComponent implements OnInit, DoCheck {

    addIcon = faPlusCircle;


    @Output() shouldShow = new EventEmitter<boolean>();
    // @ViewChild('add', {}) addProducto:any;

    @Output() catalogo = new EventEmitter<string>();

    clientes: any[] = [];
    opcionesClientes: string[] = [];

    catalogos: any[] = [];
    opcionesCatalogos: any[] = [];

    @Input() productos: any[] = [];
    @Output() submitClicked = new EventEmitter<any>();
    isShowing: boolean;

    total = 0.0;

    catalogoActual: string;
    clienteActual: string;
    constructor(private catalogoService: CatalogosService, private clienteService: ClientesService, 
                private pedidosService: PedidosService, private formBuilder: FormBuilder) {

        this.catalogoService.getCatalogos().subscribe(
            (respuesta: any) => {
                respuesta.catalogos.forEach(catalogo => {
                    this.catalogos.push(catalogo);
                    this.opcionesCatalogos.push(catalogo.nombre);
                    console.log(this.catalogos, this.opcionesCatalogos);
                });
            },
            (error) => {
                console.log(error);
            }
        );

        const idVendedor = JSON.parse(localStorage.getItem('info-usuario')).id;

            // console.log(idVendedor);

        this.clienteService.getClientes(idVendedor).subscribe(
            (respuesta) => {
                respuesta['clientes'].forEach(cliente => {
                    this.clientes.push(cliente);

                    let primerNombre = cliente.nombres.split(' ', 2)[0];
                    let apellidos = cliente.apellidos;
                    // console.log(primerNombre);
                    this.opcionesClientes.push(`${primerNombre} ${apellidos}`);
                })
            },
            (error) => {
                console.log(error);
            }
        );

    }
    ngDoCheck(): void {

        if (this.productos.length != 0) {
            this.calcularTotal();
        }
    }

    ngOnInit() {
    }

    calcularTotal() {
        this.total = 0;
        this.productos.forEach(producto => {
            const totalProducto = producto.precioProducto * producto.cantidadProducto;
            this.total += totalProducto;
        });

        // this.formaPedido.value.total = this.total;
    }

    sendShouldShow() {
        this.shouldShow.emit(true);
        this.isShowing = true;
    }

    recibirCliente($event) {
        this.clienteActual = $event._id;
        // this.formaPedido.value.idCliente = this.clienteActual;
    }

    recibirCatalogo($event) {
        // console.log('recibiendo el catalogo');
        this.catalogoActual = $event._id;

        // this.formaPedido.value.idCatalogo = this.catalogoActual;
        // this.productos = [];
        this.catalogo.emit($event._id);
    }

    isLast(index) {
        if (index === this.opcionesCatalogos.length - 1) {
            return true;
        } else {
            return false;
        }
    }  

    submit() {

            // console.log(this.productos);

            if ((this.catalogoActual) && (this.clienteActual) && (this.productos.length > 0) && (this.total > 0)) {
                const pedido = new PedidoModel();
                pedido.idClientePedido = this.clienteActual;
                pedido.idVendedorPedido = JSON.parse(localStorage.getItem('info-usuario')).id;
                pedido.idCatalogoPedido = this.catalogoActual;
                pedido.productosPedido = this.productos;
                pedido.totalPedido = this.total;

                this.pedidosService.newPedido(pedido).subscribe(
                    (respuesta) => {
                        console.log(respuesta);
                        this.submitClicked.emit({
                            ok: true,
                            idCliente: this.clienteActual,
                            respuesta,
                            total: this.total
                        });
                        this.total = 0;
                    },
                    (error) => {
                        this.submitClicked.emit({
                            ok: false
                        });
                        console.log(error);
                    }
                );
            } else {
                this.submitClicked.emit({
                    ok: false
                });
            }

        // console.log(this.formaPedido.value);
        // console.log(this.formaPedido.valid);
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {

        if ((event.target === document.getElementById('addProducto'))) {
           if (this.isShowing === true) {
               this.isShowing = false;
               this.shouldShow.emit(false);
           }
        }
    }
}
