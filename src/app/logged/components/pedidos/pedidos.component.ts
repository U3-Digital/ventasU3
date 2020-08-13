import { Component, OnInit, ViewChild, QueryList, AfterViewInit, ViewChildren } from '@angular/core';

import { ClientesService } from 'src/app/services/clientes.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { CatalogosService } from 'src/app/services/catalogos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})

export class PedidosComponent implements OnInit, AfterViewInit {

    idVendedor: string;

    catalogos: any[] = [];

    pedidos: any[] = [];
    pedidosSeleccionables: any[] = [];
    opcionesPedidosSeleccionables: string[] = [];

    clientes: string[] = [];
    datosClientes: any[] = [];

    tipoPedidoSeleccionado: string;
    pendienteCompletado = true;
    clienteSeleccionado: any;
    pedidoSeleccionado: any;

    productos: any[] = [];

    selectedIndex = 0;
    selectedClientIndex = 0;

    showingModal = false;
    messageModal = '';
    tipoModal = '';

    @ViewChildren('celdasProductos', {}) celdasProductos: QueryList<any>;

    constructor(private pedidosService: PedidosService, private clientesService: ClientesService,
                private catalogosService: CatalogosService) {

        this.idVendedor = JSON.parse(localStorage.getItem('info-usuario')).id;

        this.getPedidosPorTipo('Pendiente');
    }
    ngAfterViewInit(): void {
        this.celdasProductos.changes.subscribe(t => {
            let i = 0;
            this.productos.forEach((producto: any) => {
                const bSwitch: any = document.getElementById(`switch${i}`);
                if (producto.statusProducto === 'Pedido') {
                    bSwitch.checked = true;
                }
                i++;
            });
        });
    }

    ngOnInit() {

    }

    cambiarTipoPedido(tipo: string) {
        this.pedidosSeleccionables = [];
        this.opcionesPedidosSeleccionables = [];
        this.pedidos = [];
        this.clientes = [];
        this.datosClientes = [];

        this.selectedClientIndex = -1;
        this.productos = [];

        this.tipoPedidoSeleccionado = tipo;

        if (this.tipoPedidoSeleccionado === 'Pendiente') {
            this.pendienteCompletado = true;
        } else {
            this.pendienteCompletado = false;
        }

        this.getPedidosPorTipo(tipo);
    }

    getPedidosPorTipo(tipo: string) {

        const parametros = {
            idVendedor: this.idVendedor,
            tipo
        };

        this.pedidosService.getPedidosPorTipo(parametros).subscribe(
            (respuesta: any) => {
                const idClientes: string[] = [];
                respuesta.pedidos.forEach((pedido: any ) => {
                    this.pedidos.push(pedido);
                    idClientes.push(pedido.idClientePedido);
                });
                const idCatalogos: string[] = [];
                respuesta.pedidos.forEach((pedido: any) => {
                    idCatalogos.push(pedido.idCatalogoPedido);
                });

                this.getCatalogos(idCatalogos);
                this.getClientes(idClientes);

                console.log(idCatalogos);

            },
            (error: any) => {
                console.log(error);
            }
        );

    }

    getClientes(ids: string[]) {
        this.clientesService.getMultiplesClientes(ids).subscribe(
            (respuesta: any) => {
                respuesta.clientesDB.forEach((cliente: any) => {
                    this.clientes.push(`${cliente.nombres.split(' ', 2)[0]} ${cliente.apellidos}`);
                    this.datosClientes.push(cliente);
                });
            },
            (error) => {
                console.log(error);
            }
        );
    }

    getCatalogos(idCatalogos: string[]) {
        // console.log(idCatalogos);
        this.catalogos = [];

        this.catalogosService.getCatalogosPorId(idCatalogos).subscribe(
            (respuesta: any) => {
                respuesta.catalogosDB.forEach((catalogo: any) => {
                    this.catalogos.push(catalogo);
                });
            },
            (error) => {
                console.log(error);
            }
        );
    }

    getPedidosPorCliente(idCliente: string) {
        let i = 0;

        this.pedidos.forEach((pedido: any) => {
            if (pedido.idClientePedido === idCliente) {

                let catalogoPedido = '';

                this.catalogos.forEach((catalogo: any) => {
                    if (pedido.idCatalogoPedido === catalogo._id) {
                        catalogoPedido = catalogo.nombre;
                    }
                });

                this.opcionesPedidosSeleccionables.push(`${catalogoPedido} ${pedido.fechaPedido.split('T', 2)[0]}`);
                this.pedidosSeleccionables.push(pedido);
            }
            i++;
        });

        console.log(this.pedidosSeleccionables);
    }

    onClienteSeleccionado($event: any) {
        this.selectedIndex = -1;
        this.opcionesPedidosSeleccionables = [];
        this.productos = [];
        this.pedidosSeleccionables = [];
        console.log($event._id, 'id');
        this.getPedidosPorCliente($event._id);
    }

    onPedidoSeleccionado($event: any) {
        // this.productos = [];
        this.productos = $event.productosPedido;
        this.pedidoSeleccionado = $event;
        console.log(this.productos);
    }

    productoStatusChanged($event: any, index: number) {

        const checked = $event.target.checked;
        console.log(checked ? 'Pedido' : 'No pedido');

        const parametros = {
            idProducto: this.productos[index]._id,
            idPedido: this.pedidoSeleccionado._id,
            statusProducto: checked ? 'Pedido' : 'No pedido'
        };

        this.pedidosService.updateStatusProducto(parametros).subscribe(
            (respuesta: any) => {
                console.log(respuesta);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    completarPedido() {

        if (this.pedidoSeleccionado) {
            const parametros = {
                idPedido: this.pedidoSeleccionado._id,
                statusPedido: 'Completado'
            };
            this.pedidosService.updateStatusPedido(parametros).subscribe(
                (respuesta: any) => {
                    this.showingModal = true;
                    this.messageModal = '¡Pedido completado!';
                    this.tipoModal = 'success';

                    this.selectedIndex = -1;
                    this.cambiarTipoPedido('Pendiente');
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            this.showingModal = true;
            this.messageModal = 'Seleccione un cliente y un pedido';
            this.tipoModal = 'error';
        }

    }

    dismissed() {
        this.showingModal = false;
    }

}
