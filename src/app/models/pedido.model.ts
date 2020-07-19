import { ProductoModel } from './producto.model';

export class PedidoModel {

    idClientePedido: string;
    idVendedorPedido: string;
    idCatalogoPedido: string;
    productosPedido: ProductoModel[];
    totalPedido: number;
}