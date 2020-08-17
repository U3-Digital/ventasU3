import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { PedidoModel } from 'src/app/models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

    private url = 'http://u3digital.com.mx/ventas/controlPanel/';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            token: localStorage.getItem('token')
        })
    };


    constructor(private http: HttpClient) { }

    newPedido(pedido: PedidoModel) {

        const body = {
            // ...pedido
            idClientePedido: pedido.idClientePedido,
            idVendedorPedido: pedido.idVendedorPedido,
            idCatalogoPedido: pedido.idCatalogoPedido,
            productosPedido: pedido.productosPedido,
            totalPedido: pedido.totalPedido
        };

        return this.http.post(`${this.url}/pedidos`, body, this.httpOptions);

    }

    getPedidosPorVendedor(idVendedor: string ) {
        return this.http.get(`${this.url}/pedidos/${idVendedor}`, this.httpOptions);
    }

    getPedidosPorTipo(parametros: any) {
        const body = {
            idVendedor: parametros.idVendedor
        };

        return this.http.post(`${this.url}/pedidos/portipo/${parametros.tipo}`, body, this.httpOptions);
    }

    updateStatusProducto(parametros: any) {
        const body = {
            idProducto: parametros.idProducto,
            idPedido: parametros.idPedido,
            statusProducto: parametros.statusProducto
        };

        return this.http.put(`${this.url}/pedidos/producto`, body, this.httpOptions);

    }

    updateStatusPedido(parametros: any) {
        const body = {
            idPedido: parametros.idPedido,
            statusPedido: parametros.statusPedido
        };

        return this.http.put(`${this.url}/pedidos/completar`, body, this.httpOptions);
    }

}
