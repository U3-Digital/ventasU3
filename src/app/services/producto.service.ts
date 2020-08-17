import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductoModel } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

    private url = 'http://u3schoolapp.herokuapp.com/';

    constructor(private http: HttpClient) { }

    getProductos(idCatalogo: string) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                token: localStorage.getItem('token')
            })
        };

        return this.http.get(`${this.url}/productos/${idCatalogo}`, httpOptions);

    }

    getProductosPendientes(idCatalogo: string) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                token: localStorage.getItem('token')
            })
        };

        return this.http.get(`${this.url}/productospendientes/${idCatalogo}`, httpOptions);
    }

    newProducto(producto: ProductoModel) {

        const body = {
            codigo: producto.codigoProducto,
            nombre: producto.nombreProducto,
            idCatalogo: producto.idCatalogoProducto,
            precio: producto.precioProducto,
            cantidad: producto.cantidadProducto
        };

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              token: localStorage.getItem('token')
            })
        };

        return this.http.post(`${this.url}/producto`, body, httpOptions);

    }
}
