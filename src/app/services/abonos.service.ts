import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AbonosService {

    private url = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    newAbono(info: any) {

        const body = {
            cliente: info.idCliente,
            vendedor: info.idVendedor,
            cantidad: info.cantidad
        };

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'token': localStorage.getItem('token')  
            })
        };

        return this.http.post(`${this.url}/abono`, body, httpOptions);

    }

}
