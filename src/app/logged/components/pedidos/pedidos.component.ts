import { Component, OnInit } from '@angular/core';

import { ClientesService } from 'src/app/services/clientes.service';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})

export class PedidosComponent implements OnInit {

    idVendedor: string;

    pedidos: any[] = [];
    clientes: any[] = [];

    tipoPedidoSeleccionado: string;
    clienteSeleccionado: any;
    pedidoSeleccionado: any;

    constructor(private pedidosService: PedidosService, private clientesService: ClientesService) {

        this.idVendedor = JSON.parse(localStorage.getItem('info-usuario')).id;

        pedidosService.getPedidosPorVendedor(this.idVendedor).subscribe(
            (respuesta: any) => {
                respuesta.pedidos.forEach( (pedido: any ) => {
                    this.pedidos.push(pedido);

                    const idCliente = pedido.idClientePedido;

                    this.clientesService.getCliente(idCliente).subscribe(
                        (respuestaCliente) => {
                            console.log(respuestaCliente);
                        },
                        (error) => {
                            console.log(error);
                        }
                    );

                });
            },
            (error) => {
                console.log(error);
            }
        );
    }

    ngOnInit() {

    }

    cambiarTipoPedido(tipo: string) {
        this.tipoPedidoSeleccionado = tipo;
        console.log(this.tipoPedidoSeleccionado);
    }

    getPedidosPorTipo(tipo: string) {

        // this.pedidosService.getP

    }

    // isLast(index) {
    //     if (index === this.opciones.length - 1) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

}
