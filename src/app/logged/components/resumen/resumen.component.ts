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

    data: number[] = [];
    labels: string[] = [];

    constructor(private _categoriasService: CategoriasService, private pedidosService: PedidosService) { 

        let idVendedor = JSON.parse(localStorage.getItem('info-usuario')).id;

        this.pedidosService.getPedidosPorVendedor(idVendedor)
        .subscribe(
            (respuesta) => {
                this.pedidos = respuesta['pedidos'];
                this.pedidos.forEach(pedido => {
                    this.labels.push(pedido.fechaPedido.split('T', 2)[0]);
                    this.data.push(pedido.totalPedido);
                    this.crearTabla();
                });
            },
            (error) => {
                console.log(error);
            }
        );

    }

    ngOnInit() {
        this.Categorias = this._categoriasService.getCategorias(); 

        

        
        
        // Chart.defaults.global.elements.point.backgroundColor = '#FFFFFF';
        

        this.chart2 = new Chart('cosa2', {
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
        
        //    let exampleData = [1, 2, 3, 4, 5, 1];

        //    this.chart.data.datasets[0].data.push(exampleData);
        //    this.chart.update();
    }

    crearTabla() {
        this.chart = new Chart('cosa', {
            type: 'line',
            data: {
                labels: this.labels,
                datasets: [{
                    label: 'Ventas',
                    data: this.data,
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
    }

}
