import { Injectable } from "@angular/core";

@Injectable()
    export class CategoriasService {

        private categorias: Categoria[] = [
            {
                nombre: "Ganancias",
                nombreQuery: "",
                clase: "chip"
            },
            {
                nombre: "Pedidos",
                nombreQuery: "",
                clase: "chip"
            },
            {
                nombre: "Adeudos",
                nombreQuery: "",
                clase: "chip"
            },
            {
                nombre: "Clientes",
                nombreQuery: "",
                clase: "chip"
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