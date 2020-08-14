import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Chart } from 'chart.js';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { timestamp } from 'rxjs/operators';
@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

    Categorias: any = [];

    public chart: any = null;
    public chart2: any = null;

    pedidos: any[] = [];

    categoriaSeleccionada: string;
    idVendedor: string = JSON.parse(localStorage.getItem('info-usuario')).id;

    fechaInicial: string;
    fechaFinal: string;

    constructor(private pedidosService: PedidosService, private clientesService: ClientesService) {
        this.pedidosService.getPedidosPorVendedor(this.idVendedor).subscribe(
            (respuesta: any) => {
                respuesta.pedidos.forEach((pedido: any) => {
                    this.pedidos.push(pedido);
                });
                console.log(this.pedidos);
            },
            (error) => {
                console.log(error);
            }
        );

        this.clientesService.getClientes(this.idVendedor).subscribe(
            (respuesta: any) => {
                console.log(respuesta);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    ngOnInit() {
        Chart.defaults.global.elements.point.backgroundColor = '#0000AF';

    /*     this.chart2 = new Chart('cosa2', {
            type: 'line',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 0)',
                    ],
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: "rgb(255, 255, 255)"
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: "rgb(255, 255, 255)"
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
           });
         */
        //    let exampleData = [1, 2, 3, 4, 5, 1];

    }

    changeTipo(tipo: string) {

        if (tipo !== this.categoriaSeleccionada) {
            this.categoriaSeleccionada = tipo;
        } else {
            return;
        }

        switch (this.categoriaSeleccionada) {
            case 'ganancias':
                this.getGanancias();
                break;
            case 'pedidos':
                this.getPedidos();
                break;
            case 'adeudos':
                this.getAdeudos();
                break;
            case 'clientes':
                this.getClientes();
                break;
            default:
                console.log('error');
                break;
        }

    }

    shouldBeActive(tipo: string): boolean {
        if (tipo === this.categoriaSeleccionada) {
            return true;
        }
        return false;
    }

    getGanancias(fechas?: any) {
        if (fechas) {

        } else {
            const pedidosUltimoMes = [];
            this.pedidos.forEach((pedido: any) => {
                const today = new Date(Date.now());
                const mes = new Date(Date.now() - 2592000000);
                const fechaPedido = new Date(pedido.fechaPedido);

                if ((fechaPedido <= today && fechaPedido >= mes) && (pedido.status === 'Completado')) {
                    pedidosUltimoMes.push(pedido);
                }

            });

            console.log(pedidosUltimoMes);
        }
    }

    getPedidos() {
        console.log('pedidos');
    }

    getAdeudos() {
        console.log('adeudos');
    }

    getClientes() {
        console.log('clientes');
    }

    setSeleccion(nombre: string): void {

    }

    setTiempo(ultimoMes: boolean) {

    }

    getFechaHoy(): string {
        return '';
    }

    crearTabla(data: number[], labels: string[]): void {
        this.chart = new Chart('cosa', {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'Ventas',
                    data,
                    backgroundColor: [
                        'rgba(3, 68, 255, 1)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 0)',
                    ],
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: 'rgb(255, 255, 255)'
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: 'rgb(255, 255, 255)'
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
           });

        this.chart.update();
    }

}
