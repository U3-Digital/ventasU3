import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { PedidoModel } from 'src/app/models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

    private url = 'http://localhost:3000';

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

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'token': localStorage.getItem('token')  
            })
        };

        return this.http.post(`${this.url}/pedidos`, body, httpOptions);

    }

    getPedidosPorVendedor(idVendedor: string ) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'token': localStorage.getItem('token')  
            })
        };

        return this.http.get(`${this.url}/pedidos/${idVendedor}`, httpOptions);
    }
}
