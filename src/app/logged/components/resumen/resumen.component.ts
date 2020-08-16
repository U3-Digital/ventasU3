import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { CatalogosService } from 'src/app/services/catalogos.service';
@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit, AfterViewInit {

    Categorias: any = [];

    public chart: any = null;
    public chart2: any = null;

    pedidos: any[] = [];

    categoriaSeleccionada: string;
    idVendedor: string = JSON.parse(localStorage.getItem('info-usuario')).id;

    fechaInicial: string;
    fechaFinal: string;

    catalogos: any[] = [];
    clientes: any[] = [];
    clientesMasPedidos: any[] = [];
    clientesMasCompras: any[] = [];

    ultimoMesDesdeHace: boolean;

    @ViewChild('cajaFechaGanancias', {}) cajaFechaGanancias: ElementRef;
    @ViewChild('cajaFechaPedidos', {}) cajaFechaPedidos: ElementRef;

    constructor(private pedidosService: PedidosService, private clientesService: ClientesService,
                private catalogosService: CatalogosService) {

        const idCatalogos = [];

        this.pedidosService.getPedidosPorVendedor(this.idVendedor).subscribe(
            (respuesta: any) => {
                respuesta.pedidos.forEach((pedido: any) => {
                    if (!idCatalogos.includes(pedido.idCatalogoPedido)) {
                        idCatalogos.push(pedido.idCatalogoPedido);
                    }
                    this.pedidos.push(pedido);
                });
                this.catalogosService.getCatalogosPorId(idCatalogos).subscribe(
                    (respuestaCatalogos: any) => {
                        respuestaCatalogos.catalogosDB.forEach((catalogo: any) => {
                            this.catalogos.push(catalogo);
                        });
                        console.log(this.catalogos);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            },
            (error) => {
                console.log(error);
            }
        );

        this.clientesService.getClientes(this.idVendedor).subscribe(
            (respuesta: any) => {
                respuesta.clientes.forEach((cliente: any) => {
                    this.clientes.push(cliente);
                });

            },
            (error) => {
                console.log(error);
            }
        );

        console.log(idCatalogos);

    }
    ngAfterViewInit(): void {

    }

    ngOnInit() {
        Chart.defaults.global.elements.point.backgroundColor = '#0000AF';
    }

    changeTipo(tipo: string) {
        this.ultimoMesDesdeHace = false;

        if (tipo !== this.categoriaSeleccionada) {
            this.categoriaSeleccionada = tipo;
        } else {
            return;
        }
        const today = new Date(Date.now());
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();

        let stringMonth: string;
        let stringDay: string;

        month < 10 ? stringMonth = `0${month}` : stringMonth = `${month}`;

        day < 10 ? stringDay = `0${day}` : stringDay = `${day}`;

        switch (this.categoriaSeleccionada) {

            case 'ganancias':

                console.log(year, stringMonth, stringDay);
                // console.log(year, month, day);
                this.cajaFechaGanancias.nativeElement.max = `${year}-${stringMonth}-${stringDay}`;
                break;
            case 'pedidos':

                console.log(year, stringMonth, stringDay);
                // console.log(year, month, day);
                this.cajaFechaPedidos.nativeElement.max = `${year}-${stringMonth}-${stringDay}`;
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

    getGanancias(fecha?: any) {
        if (fecha) {

            this.ultimoMesDesdeHace = false;

            const pedidosDesdeFecha = [];

            this.pedidos.forEach((pedido: any) => {
                const fechaPedido = new Date(pedido.fechaPedido);
                const today = new Date(Date.now());
                const fechaDesde = new Date(fecha.target.value);

                if ((fechaPedido <= today && fechaPedido >= fechaDesde) && (pedido.status === 'Completado')) {
                    pedidosDesdeFecha.push(pedido);
                }

            });

            const diasDesdeFecha = this.getDiasDeMesDondeHuboPedidos(pedidosDesdeFecha);

            const data = [];
            diasDesdeFecha.forEach((dia: string) => {
                const totalesDelDia = [];

                let i = 0;

                pedidosDesdeFecha.forEach((pedido: any) => {
                    let totalPedido = 0;
                    const fechaPedido = pedido.fechaPedido.split('T', 2)[0];
                    if (dia === fechaPedido) {
                        totalPedido = this.getTotalPedido(pedido, pedido.idCatalogoPedido);
                    }

                    totalesDelDia.push(totalPedido);
                    i++;
                });
                const totalDia = this.sumaTotalesDelDia(totalesDelDia);
                data.push(totalDia);
            });

            this.crearTabla(data, diasDesdeFecha, 'Ganancias', 'ganancias');

        } else {
            this.ultimoMesDesdeHace = true;
            const pedidosUltimoMes = [];
            this.pedidos.forEach((pedido: any) => {
                const today = new Date(Date.now());
                const mesPasado = new Date(Date.now() - 2592000000);
                const fechaPedido = new Date(pedido.fechaPedido);

                if ((fechaPedido <= today && fechaPedido >= mesPasado) && (pedido.status === 'Completado')) {
                    pedidosUltimoMes.push(pedido);
                }

            });

            const diasDelMes = this.getDiasDeMesDondeHuboPedidos(pedidosUltimoMes);

            const data = [];
            diasDelMes.forEach((dia: string) => {
                const totalesDelDia = [];

                let i = 0;
                pedidosUltimoMes.forEach((pedido: any) => {
                    let totalPedido = 0;
                    const fechaPedido = pedido.fechaPedido.split('T', 2)[0];
                    if (dia === fechaPedido) {
                        totalPedido = this.getTotalPedido(pedido, pedido.idCatalogoPedido);
                    }
                    totalesDelDia.push(totalPedido);
                    i++;
                });
                const totalDia = this.sumaTotalesDelDia(totalesDelDia);
                data.push(totalDia);

            });

            this.crearTabla(data, diasDelMes, 'Ganancias', 'ganancias');
        }
    }

    getDiasDeMesDondeHuboPedidos(pedidos: any[]) {

        const dias = [];

        pedidos.forEach((pedido: any) => {
            if (!dias.includes(pedido.fechaPedido.split('T', 2)[0])) {
                dias.push(pedido.fechaPedido.split('T', 2)[0]);
            }
        });
        return dias;
    }

    getTotalPedido(pedido: any, idCatalogo: string) {

        let ganancia = 0;

        this.catalogos.forEach((catalogo: any) => {
            if (catalogo._id === idCatalogo) {
                ganancia = catalogo.ganancia;
            }
        });

        let totalPedido = 0;
        pedido.productosPedido.forEach((producto: any) => {
            if (producto.statusProducto === 'Pedido') {
                totalPedido += producto.precioProducto * producto.cantidadProducto;
            }
        });

        totalPedido = (totalPedido * ganancia) / 100;

        return totalPedido;
    }

    sumaTotalesDelDia(totales: number[]) {
        let total = 0;
        totales.forEach((t: number) => {
            total += t;
        });
        return total;
    }

    getPedidos(fecha?: any) {
        if (fecha) {
            this.ultimoMesDesdeHace = false;

            const pedidosDesdeFecha = [];

            this.pedidos.forEach((pedido: any) => {
                const fechaPedido = new Date(pedido.fechaPedido);
                const today = new Date(Date.now());
                const fechaDesde = new Date(fecha.target.value);

                if ((fechaPedido <= today && fechaPedido >= fechaDesde) && (pedido.status === 'Completado')) {
                    pedidosDesdeFecha.push(pedido);
                }

            });

            const diasDesdeFecha = this.getDiasDeMesDondeHuboPedidos(pedidosDesdeFecha);
            const data = [];

            diasDesdeFecha.forEach((dia: string) => {
                    let cuantos = 0;
                    pedidosDesdeFecha.forEach((pedido: any) => {
                        const fechaPedido = pedido.fechaPedido.split('T', 2)[0];
                        if (dia === fechaPedido) {
                            cuantos++;
                        }
                    });
                    data.push(cuantos);
                });

            this.crearTabla(data, diasDesdeFecha, 'No. de pedidos', 'pedidos');

        } else {
            this.ultimoMesDesdeHace = true;

            const pedidosUltimoMes = [];

            this.pedidos.forEach((pedido: any) => {
                const today = new Date(Date.now());
                const mesPasado = new Date(Date.now() - 2592000000);
                const fechaPedido = new Date(pedido.fechaPedido);

                if ((fechaPedido <= today && fechaPedido >= mesPasado) && (pedido.status === 'Completado')) {
                    pedidosUltimoMes.push(pedido);
                }
            });

            const diasDelMes = this.getDiasDeMesDondeHuboPedidos(pedidosUltimoMes);
            const data = [];

            diasDelMes.forEach((dia: string) => {
                let cuantos = 0;
                pedidosUltimoMes.forEach((pedido: any) => {
                    const fechaPedido = pedido.fechaPedido.split('T', 2)[0];
                    if (dia === fechaPedido) {
                        cuantos++;
                    }
                });
                data.push(cuantos);
            });

            this.crearTabla(data, diasDelMes, 'No. de pedidos', 'pedidos');

        }
    }

    getAdeudos() {
        this.clientes.sort((cliente1: any, cliente2: any) => {
            if (cliente1.adeuda > cliente2.adeuda) {
                return -1;
            }

            if (cliente1.adeuda < cliente2.adeuda) {
                return 1;
            }
        });
        console.log(this.clientes);
    }

    getClientes() {
        this.getClientesMasPedidos();
        this.getClientesMasCompras();
    }

    getClientesMasPedidos() {
        this.clientesMasPedidos = [];
        this.clientes.forEach((cliente: any) => {
            let cuenta = 0;
            this.pedidos.forEach((pedido: any) => {
                if (cliente._id === pedido.idClientePedido) {
                    cuenta++;
                }
            });
            this.clientesMasPedidos.push({cliente, cuenta});
        });

        this.clientesMasPedidos.sort((cliente1: any, cliente2: any) => {
            if (cliente1.cuenta > cliente2.cuenta) {
                return -1;
            }
            if (cliente1.cuenta < cliente2.cuenta) {
                return 1;
            }
        });

        console.log(this.clientesMasPedidos);
    }

    getClientesMasCompras() {
        this.clientesMasCompras = [];
        this.clientes.forEach((cliente: any) => {
            this.clientesMasCompras.push(cliente);
        });

        this.clientesMasCompras.sort((cliente1, cliente2) => {

            if (cliente1.compras > cliente2.compras) {
                return -1;
            }

            if (cliente1.compras < cliente2.compras) {
                return 1;
            }
        });
    }

    crearTabla(data: number[], labels: string[], datasetLabel: string, idChart: string): void {
        this.chart = new Chart(idChart, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: datasetLabel,
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
