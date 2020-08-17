import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ClienteModel } from 'src/app/models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

    private url = 'http://u3digital.com.mx/ventas/controlPanel/';

    constructor(private http: HttpClient) { }

    getClientes(idVendedor) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                token: localStorage.getItem('token')
            })
        };

        return this.http.get(`${this.url}/cliente/${idVendedor}`, httpOptions);
    }

    getCliente(idCliente: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                token: localStorage.getItem('token')
            })
        };

        return this.http.get(`${this.url}/clientes/${idCliente}`, httpOptions);
    }

    getMultiplesClientes(idClientes: string[]) {
        const body = {
            idClientes
        };

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                token: localStorage.getItem('token')
            })
        };

        return this.http.post(`${this.url}/clientes/multiple`, body, httpOptions);
    }

    newCliente(cliente: ClienteModel) {
        const body = {
            nombres: cliente.nombres,
            apellidos: cliente.apellidos,
            telefono: cliente.telefono,
            email: cliente.email,
            adeuda: cliente.adeuda,
            compras: cliente.compras,
            vendedor: cliente.vendedor
        };

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                token: localStorage.getItem('token')
            })
        };

        return this.http.post(`${this.url}/cliente`, body, httpOptions);
    }

    updateComprasAdeudaCliente(info: any) {

        const body = {
            comprasCliente: info.compras,
            adeudaCliente: info.adeuda,
        };

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                token: localStorage.getItem('token')
            })
        };

        return this.http.put(`${this.url}/cliente/${info.idCliente}`, body, httpOptions);

    }

    updateAdeudoCliente(info: any) {

        const body = {
            adeudaCliente: info.adeuda
        };

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                token: localStorage.getItem('token')
            })
        };

        return this.http.put(`${this.url}/clienteadeuda/${info.idCliente}`, body, httpOptions);

    }
}
