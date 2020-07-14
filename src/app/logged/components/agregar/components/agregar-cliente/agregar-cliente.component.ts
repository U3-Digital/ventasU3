import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent implements OnInit {

    formaCliente: FormGroup;
            
    @Output() clienteClickedEvent = new EventEmitter<FormGroup>();

    constructor(private formBuilder: FormBuilder) { 
        this.crearFormulario();
    }

    ngOnInit() {
    }

    get nombresNoValidos() {
        return this.formaCliente.get('nombres').invalid && this.formaCliente.get('nombres').touched;
    }

    get apellidosNoValidos() {
        return this.formaCliente.get('apellidos').invalid && this.formaCliente.get('apellidos').touched;
    }

    get telefonoNoValido() {
        return this.formaCliente.get('telefono').invalid && this.formaCliente.get('telefono').touched;
    }

    get emailNoValido() {
        return this.formaCliente.get('email').invalid && this.formaCliente.get('email').touched;
    }

    crearFormulario() {
        this.formaCliente = this.formBuilder.group({
            nombres: ['', [Validators.required]],
            apellidos: ['', [Validators.required]],
            telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]]
        });
    }

    sendSubmit() {
        this.clienteClickedEvent.emit(this.formaCliente);
    }

}
