import { Injectable } from "@angular/core";

@Injectable()
    export class CategoriasService {

        private categorias: Categoria[] = [
            {
                nombre: "Ganancias",
                nombreQuery: "",
                clase: "card categorias ganancias"
            },
            {
                nombre: "Pedidos",
                nombreQuery: "",
                clase: "card categorias pedidos"
            },
            {
                nombre: "Adeudos",
                nombreQuery: "",
                clase: "card categorias adeudos"
            },
            {
                nombre: "Clientes",
                nombreQuery: "",
                clase: "card categorias clientes"
            }
        ];

        getCategorias(): Categoria[] {
            return this.categorias;
        }

        constructor () {
            console.log("Services: Categorias - Listo para usarse");
        }
    }

    export interface Categoria {
        nombre: String;
        nombreQuery: String;
        clase: String;
    }