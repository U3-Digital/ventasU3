import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Chart } from 'chart.js';
import { PedidosService } from 'src/app/services/pedidos.service';
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

    constructor(private _categoriasService: CategoriasService, private pedidosService: PedidosService) { 

    }

    ngOnInit() {
        this.Categorias = this._categoriasService.getCategorias(); 

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

    getGanancias() {

        let labels: string[] = [];
        let data: number[] = [];

        this.pedidosService.getPedidosPorVendedor(this.idVendedor)
        .subscribe(
            (respuesta) => {
                this.pedidos = respuesta['pedidos'];
                this.pedidos.forEach(pedido => {
                    labels.push(pedido.fechaPedido.split('T', 2)[0]);
                    data.push(pedido.totalPedido);
                    this.crearTabla(data, labels);
                });
            },
            (error) => {
                console.log(error);
            }
        );
    }

    getPedidos() {

    }

    getAdeudos() {

    }

    getClientes() {

    }

    setSeleccion (nombre: string): void {
        this.categoriaSeleccionada = nombre;
        console.log(this.categoriaSeleccionada);

        switch(this.categoriaSeleccionada) {
            case 'Ganancias':
                this.getGanancias();
            break;
        }

    }

    setTiempo (ultimoMes: boolean) {
        if (ultimoMes === true) {
            this.fechaFinal = this.getFechaHoy()
        }
    }

    getFechaHoy(): string {
        return "";
    }

    crearTabla(data: number[], labels: string[]): void {
        this.chart = new Chart('cosa', {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Ventas',
                    data: data,
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

           this.chart.update();
    }

}
