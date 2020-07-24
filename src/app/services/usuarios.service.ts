import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UsuarioModel } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

    private url = 'http://localhost:3000';

    constructor(private http: HttpClient) { }


    getUsuarios() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'token': localStorage.getItem('token')
            })
        };

        return this.http.get(`${this.url}/usuario`, httpOptions);
    }

    newUsuario(usuario: UsuarioModel) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'token': localStorage.getItem('token')
            })
        };

        const body = {
            nombre: usuario.nombre,
            email: usuario.email,
            password: usuario.password,
            role: usuario.role
        };

        return this.http.post(`${this.url}/usuario`, body, httpOptions);

    }

    updateUsuario(campos: any) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'token': localStorage.getItem('token')
            })
        };

        const body = {
            nombre: campos.nombre,
            email: campos.email,
            password: campos.password
        }

        return this.http.put(`${this.url}/usuarios/${campos.id}`, body, httpOptions);

    }

    deleteUsuario() {

    }


}
