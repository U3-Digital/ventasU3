import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UsuarioModel } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

    private url = 'http://u3digital.com.mx/ventas/controlPanel/';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            token: localStorage.getItem('token')
        })
    };

    constructor(private http: HttpClient) { }


    getUsuarios() {

        return this.http.get(`${this.url}/usuario`, this.httpOptions);
    }

    newUsuario(usuario: UsuarioModel) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                token: localStorage.getItem('token')
            })
        };

        const body = {
            nombre: usuario.nombre,
            email: usuario.email,
            password: usuario.password,
            role: usuario.role
        };

        return this.http.post(`${this.url}/usuario`, body, this.httpOptions);

    }

    updateUsuario(campos: any) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                token: localStorage.getItem('token')
            })
        };

        const body = {
            nombre: campos.nombre,
            email: campos.email,
            password: campos.password,
            role: campos.role
        };

        return this.http.put(`${this.url}/usuarios/${campos._id}`, body, this.httpOptions);

    }

    deleteUsuario(idUsuario: string) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                token: localStorage.getItem('token')
            })
        };

        return this.http.delete(`${this.url}/usuario/${idUsuario}`,  this.httpOptions);

    }

    updateSelfUsuario(parametros: any) {
        const body = {
            nombreUsuario: parametros.nombreUsuario,
            emailUsuario: parametros.emailUsuario,
            telefonoUsuario: parametros.telefonoUsuario,
            passwordUsuario: parametros.passwordUsuario
        };

        return this.http.put(`${this.url}/usuario/self/${parametros.idUsuario}`, body, this.httpOptions);
    }

    getSelfUsuario(idUsuario: string) {
        return this.http.get(`${this.url}/usuario/self/${idUsuario}`, this.httpOptions);
    }

    uploadProfilePic(parametros: any) {
        const formData = new FormData();

        formData.append('profilePicture', parametros.imagen);
        formData.append('id', parametros.idUsuario);

        const httpO = {
            headers: new HttpHeaders({
                token: localStorage.getItem('token')
            })
        };

        return this.http.post(`${this.url}/usuario/self/photo`, formData, httpO);
    }

}
