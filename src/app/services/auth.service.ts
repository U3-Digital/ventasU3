import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AdminModel } from '../models/admin.model';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    // url general
    private url = 'http://localhost:3000';

    userToken: string;

    constructor(private http: HttpClient) {

        this.leerToken();

    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('info-usuario');
    }

    loginAdmin(admin: AdminModel) {

        const body = {
            ...admin
        };

        // const httpOptions = {
        //     headers: new HttpHeaders({
        //       'Content-Type':  'application/json'
        //     })
        //   };

        return this.http.post(
            `${this.url}/login`,
            body
        ).pipe(
            map( (respuesta: any) => {
                this.guardarToken(respuesta.token);
                return respuesta;
            })
        );
    }

    login(user: UserModel) {

        const body = {
            ...user
        };

        return this.http.post(
            `${this.url}/login`,
            body
        ).pipe(
            map( (respuesta: any) => {
                this.guardarToken(respuesta.token);
                return respuesta;
            })
        );
    }

    private guardarToken(idToken: string) {
        this.userToken = idToken;
        localStorage.setItem('token', idToken);
    }

    private leerToken(): string {
        if (localStorage.getItem('token')) {
            this.userToken = localStorage.getItem('token');
        } else {
            this.userToken = '';
        }

        return this.userToken;
    }

    isAuthenticated(): boolean {
        return this.userToken.length > 20;
    }
}
