import { Injectable } from '@angular/core';
import { AdminModel } from '../models/admin.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    //url general
    private url = 'http://localhost:3000';
    
    userToken: string;

    constructor(private http: HttpClient) { 

        this.leerToken();

    }

    logout () {
        localStorage.removeItem('token');
    }

    loginAdmin (admin: AdminModel) {

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
            map( (respuesta) => {
                this.guardarToken(respuesta['token']);
                return respuesta;
            })
        );

    }

    private guardarToken (idToken: string) {
        this.userToken = idToken;
        localStorage.setItem('token', idToken);
    }

    private leerToken (): string {
        if (localStorage.getItem('token')) {
            this.userToken = localStorage.getItem('token');
        } else {
            this.userToken = '';
        }

        return this.userToken;
    }

    isAuthenticated (): boolean {
        return this.userToken.length === 315;
    }
}
