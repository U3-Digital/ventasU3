import { Injectable } from '@angular/core';

@Injectable()
    export class ServicioService {

        private servicios: Servicio[] = [
            {
                nombre: 'Clientes',
                clase: 'card card-servicio animate__animated animate__fadeInDown animate__faster',
                link: 'logged/clientes'
            },
            {
                nombre: 'Pedidos',
                clase: 'card card-servicio animate__animated animate__fadeInDown animate__faster animate__delay-1s',
                link: 'logged/pedidos'
            },
            {
                nombre: 'Catálogos',
                clase: 'card card-servicio animate__animated animate__fadeInDown animate__faster animate__delay-2s',
                link: 'logged/catalogos'
            },
            {
                nombre: 'Resumen',
                clase: 'card card-servicio animate__animated animate__fadeInDown animate__faster animate__delay-3s',
                link: 'logged/resumen'
            },
            {
                nombre: 'Perfil',
                clase: 'card card-servicio animate__animated animate__fadeInDown animate__faster animate__delay-4s',
                link: 'logged/perfil'
            }
        ];

        getServicios(): Servicio[] {
            return this.servicios;
        }

        constructor() {
            console.log('Services: Servicios - Listo para usarse');
        }

    }

export interface Servicio {
    nombre: string;
    clase: string;
    link: string;
}
