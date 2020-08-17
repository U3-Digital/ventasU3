import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CatalogoModel } from '../models/catalogo.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

    private url = 'http://localhost:3000';

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          token: localStorage.getItem('token')
        })
    };

    constructor(private http: HttpClient) {

    }

    getCatalogos() {
        return this.http.get(`${this.url}/catalogo`, this.httpOptions);
    }

    newCatalogo(parametros: any) {
        const body = {
            idVendedor: parametros.idVendedor,
            catalogo: parametros.catalogo
        };

        return this.http.post(`${this.url}/catalogo`, body, this.httpOptions);
    }


    getCatalogosPorId(idCatalogos: string[]) {

        return this.http.post(`${this.url}/catalogos`, {idCatalogos}, this.httpOptions);

    }

    getCatalogosPorVendedor(idUsuario: string) {
        return this.http.get(`${this.url}/catalogos/usuario/${idUsuario}`, this.httpOptions);
    }
}
