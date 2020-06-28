import { Injectable } from "@angular/core";

@Injectable()
    export class ServicioService {
        
        private servicios: Servicio[] = [
            {
                nombre: "Clientes",
                clase: "card card-servicio mx-auto mt-5 background-1",
                link: "logged/clientes"
            },
            {
                nombre: "Pedidos",
                clase: "card card-servicio mx-auto mt-5 background-2",
                link: "logged/pedidos"
            },
            {
                nombre: "Catálogos",
                clase: "card card-servicio mx-auto mt-5 background-3",
                link: "logged/catalogo"
            },
            {
                nombre: "Resumen",
                clase: "card card-servicio mx-auto mt-5 background-4",
                link: "logged/resumen"
            },
            {
                nombre: "Perfil",
                clase: "card card-servicio mx-auto mt-5 mb-5 background-5",
                link: "logged/perfil"
            }
            
        ];

        getServicios(): Servicio[] {
            return this.servicios;
        }

        constructor () {
            console.log("Services: Servicios - Listo para usarse");
        }

    }

    export interface Servicio {
        nombre: String;
        clase: String;
        link: String;
    }