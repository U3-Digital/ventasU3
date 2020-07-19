import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ClientesService } from 'src/app/services/clientes.service';
import { AbonosService } from 'src/app/services/abonos.service';

@Component({
  selector: 'app-agregar-abonos',
  templateUrl: './agregar-abonos.component.html',
  styleUrls: ['./agregar-abonos.component.css']
})
export class AgregarAbonosComponent implements OnInit {

    datosClientes: any[] = [];
    opcionesClientes: string[] = [];
    @Output() submitClicked = new EventEmitter<any>();

    formaAbono: FormGroup;
    clienteActual: any;
    idVendedor: string;

    constructor (private clientesService: ClientesService, private abonosService: AbonosService, private formBuilder: FormBuilder) {

        this.idVendedor = JSON.parse(localStorage.getItem('info-usuario')).id;

        this.clientesService.getClientes(this.idVendedor)
            .subscribe(
                (respuesta) => {
                    respuesta['clientes'].forEach( cliente => {
                        this.datosClientes.push(cliente);
                        let nombreCliente = `${cliente.nombres.split(' ', 2)[0]} ${cliente.apellidos}`;
                        this.opcionesClientes.push(nombreCliente);

                    });
                },
                (error) => {
                    console.log(error);
                }
            );
        this.crearFormulario();
    }

    ngOnInit(): void {
    }

    crearFormulario() {
        this.formaAbono = this.formBuilder.group({
            cantidad: ['', [Validators.required, Validators.pattern('^[0-9]+(.[0-9]+)?$')]]
        });
    }

    get isCantidadValid() {
        return this.formaAbono.get('cantidad').invalid && this.formaAbono.get('cantidad').touched;
    }

    recibirChildClicked($event) {
        this.clienteActual = $event;
    }

    submit() {

        if (this.clienteActual) {
            if (this.formaAbono.valid === true) {
                if (this.formaAbono.value.cantidad <= this.clienteActual.adeuda) {
                    console.log(this.clienteActual.id);
                    console.log(this.clienteActual._id);
    
                    let info = {
                        idCliente: this.clienteActual._id,
                        idVendedor: this.idVendedor,
                        cantidad: this.formaAbono.value.cantidad
                    }
    
                    this.abonosService.newAbono(info)
                        .subscribe(
                            () => {
    
                                let nuevoAdeudo = this.formaAbono.value.cantidad;
    
                                let info = {
                                    idCliente: this.clienteActual._id,
                                    adeuda: nuevoAdeudo
                                }
    
                                this.clientesService.updateAdeudoCliente(info)
                                .subscribe(
                                    () => {
                                        this.submitClicked.emit({
                                            tipo: 'success',
                                            mensaje: 'Abono agregado exitosamente'
                                        });
                                    }, 
                                    (error) => {
                                        this.submitClicked.emit({
                                            tipo: 'error',
                                            mensaje: 'El abono no puede ser mayor que la deuda del cliente'
                                        });
                                    }
                                )
    
                                
                            },
                            (error) => {
                                console.log(error);
                            }
                        );
                } else {
                    this.submitClicked.emit({
                        tipo: 'error',
                        mensaje: 'El abono no puede ser mayor que la deuda del cliente'
                    });
                }

                
            } else {
                this.submitClicked.emit({
                    tipo: 'error',
                    mensaje: 'Complete todos los campos para continuar'
                });
            }
        } else {
            this.submitClicked.emit({
                tipo: 'error',
                mensaje: 'Seleccione un cliente'
            });
        }

        
    }
}
