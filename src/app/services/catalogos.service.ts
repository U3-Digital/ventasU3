import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CatalogoModel } from '../models/catalogo.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

    private url = 'http://localhost:3000';

    constructor(private http: HttpClient) { 

    }

    getCatalogos () {

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'token': localStorage.getItem('token')
            })
          };

        return this.http.get(`${this.url}/catalogo`, httpOptions);
    }

    newCatalogo(catalogo: CatalogoModel) {
        const body = {
            ...catalogo
        }

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'token': localStorage.getItem('token')
            })
        };


        return this.http.post(`${this.url}/catalogo`, body, httpOptions);
    }

}
 