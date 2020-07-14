import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'; 

import { CatalogosService } from 'src/app/services/catalogos.service';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-agregar-pedido',
  templateUrl: './agregar-pedido.component.html',
  styleUrls: ['./agregar-pedido.component.css']
})
export class AgregarPedidoComponent implements OnInit {

    addIcon = faPlusCircle;


    @Output() shouldShow = new EventEmitter<boolean>();
    // @ViewChild('add', {}) addProducto:any;

    @Output() catalogo = new EventEmitter<string>();

    clientes: any[] = [];
    opcionesClientes: string[] = [];

    catalogos: any[] = [];
    opcionesCatalogos: any[] = [];

    @Input() productos: any[] = [];

    isShowing: boolean;

    constructor(private catalogoService: CatalogosService, private clienteService: ClientesService) {

        this.catalogoService.getCatalogos().subscribe(
            (respuesta) => {
                respuesta['catalogos'].forEach(catalogo => {
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

    ngOnInit() {
    }
    
    sendShouldShow() {
        this.shouldShow.emit(true);
        this.isShowing = true;
    }
    
    recibirCatalogo($event) {
        this.catalogo.emit($event._id);
    }

    isLast(index) {
        if (index === this.opcionesCatalogos.length - 1) {
            return true;
        } else {
            return false;
        }
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
