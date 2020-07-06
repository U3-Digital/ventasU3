import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

    opciones: string[] = ['Andrea', 'Avon', 'Mary-Kay', 'Betterware', 'Herbalife :v'];

    constructor() { }

    ngOnInit() {

    }

    isLast(index) {
        if (index === this.opciones.length - 1) {
            return true;
        } else {
            return false;
        }
    }

}
