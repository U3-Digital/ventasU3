import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ClienteModel } from 'src/app/models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

    private url = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    getClientes(idVendedor) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
              'token': localStorage.getItem('token')
            })
        }

        return this.http.get(`${this.url}/cliente/${idVendedor}`, httpOptions);
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
        }

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            })
        };

        return this.http.post(`${this.url}/cliente`, body, httpOptions);
    }
}
