import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

    clientesOpciones: any[] = [];
    clientesDatos: any[] = [];
    clienteActual: any;
    telefonoCliente: string;
    emailCliente: string;
    adeudoCliente: number;
    comprasCliente: number;
    nombreCliente = 'Cliente';

    constructor(private clientesService: ClientesService) {
        const idVendedor = JSON.parse(localStorage.getItem('info-usuario')).id;
        clientesService.getClientes(idVendedor)
        .subscribe(
            (respuesta: any) => {
                respuesta.clientes.forEach( cliente => {
                    this.clientesDatos.push(cliente);
                    const nombreCliente = `${cliente.nombres.split(' ', 2)[0]} ${cliente.apellidos}` 
                    this.clientesOpciones.push(nombreCliente);

                });

            }, (error) => {
                console.log(error);
            }
        );
    }

    ngOnInit(): void {
        this.nombreCliente = ' ';
    }

    recibirClienteClicked($event) {
        this.clienteActual = $event;
        this.nombreCliente =  `${this.clienteActual.nombres} ${this.clienteActual.apellidos}`;
        this.telefonoCliente = this.clienteActual.telefono;
        this.emailCliente = this.clienteActual.email;
        this.comprasCliente = this.clienteActual.compras;
        this.adeudoCliente = this.clienteActual.adeuda;
    }

}
