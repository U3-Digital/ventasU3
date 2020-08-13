import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-catalogo',
  templateUrl: './agregar-catalogo.component.html',
  styleUrls: ['./agregar-catalogo.component.css']
})
export class AgregarCatalogoComponent implements OnInit {

    formaCatalogo: FormGroup;

    @Output() catalogoClickedEvent = new EventEmitter<FormGroup>();

    constructor(private formBuilder: FormBuilder) {
        this.crearFormulario();
    }

    ngOnInit(): void {
    }

    get nombreNoValido() {
        return this.formaCatalogo.get('nombre').invalid && this.formaCatalogo.get('nombre').touched;
    }

    get gananciaNoValida() {
        return this.formaCatalogo.get('ganancia').invalid && this.formaCatalogo.get('ganancia').touched;
    }
    crearFormulario() {
        this.formaCatalogo = this.formBuilder.group({
            nombre: ['', [Validators.required]],
            ganancia: ['', [Validators.required]]
        });
    }

    sendSubmit() {
        this.catalogoClickedEvent.emit(this.formaCatalogo);
    }
}
