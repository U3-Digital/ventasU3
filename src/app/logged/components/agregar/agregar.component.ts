import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

    opciones: String[] = ['Pedido', 'Cliente'];
    childClicked: string;
    constructor() { }

    ngOnInit() {
    }

    recibirChildClicked($event) {
    this.childClicked = $event;
    }

    showForm(nombre) {
        return nombre === this.childClicked;
    }

}
