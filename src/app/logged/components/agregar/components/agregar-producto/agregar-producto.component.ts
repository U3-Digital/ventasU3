import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { ProductoService } from 'src/app/services/producto.service';
import { ProductoModel } from 'src/app/models/producto.model';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

    formaProducto: FormGroup;

    @Input() showing: boolean;
    @Input() catalogo: string;

    @Output() productoClickedEvent = new EventEmitter<ProductoModel>();

    mensajeModal = '';
    showModal = false;
    icon = faExclamationTriangle;
    tipoModal = 'error';

    @ViewChild('codigoProducto', {}) cajaCodigoProducto: ElementRef;
    @ViewChild('nombreProducto', {}) cajaNombreProducto: ElementRef;
    @ViewChild('cantidadProducto', {}) cajaCantidadProducto: ElementRef;
    @ViewChild('precioProducto', {}) cajaPrecioProducto: ElementRef;

    constructor(private formBuilder: FormBuilder, private productosService: ProductoService) {
        this.crearFormulario();

    }

    ngOnInit(): void {
    }

    get codigoNoValido() {
        return this.formaProducto.get('codigoProducto').invalid && this.formaProducto.get('codigoProducto').touched;
    }

    get nombreNoValido() {
        return this.formaProducto.get('nombreProducto').invalid && this.formaProducto.get('nombreProducto').touched;
    }

    get cantidadNoValida() {
        return this.formaProducto.get('cantidadProducto').invalid && this.formaProducto.get('cantidadProducto').touched;
    }

    get precioNoValido() {
        return this.formaProducto.get('precioProducto').invalid && this.formaProducto.get('precioProducto').touched;
    }

    recibirChildClicked($event) {
        this.formaProducto.value.idCatalogoProducto = $event._id;
    }

    crearFormulario () {
        this.formaProducto = this.formBuilder.group({
            codigoProducto: ['', Validators.required],
            nombreProducto: ['', Validators.required],
            cantidadProducto: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
            precioProducto: ['', [Validators.required, Validators.pattern('^[0-9]+(.[0-9]+)?$')]]
        });
    }

    submit() {
        this.showModal = false;
        if ((this.catalogo) && (this.formaProducto.valid === true)) {

            const producto: ProductoModel = new ProductoModel();
            producto.idCatalogoProducto = this.catalogo;
            producto.codigoProducto = this.formaProducto.value.codigoProducto;
            producto.nombreProducto = this.formaProducto.value.nombreProducto;
            producto.cantidadProducto = this.formaProducto.value.cantidadProducto;
            producto.precioProducto = this.formaProducto.value.precioProducto;
            producto.statusProducto = 'No pedido';

            this.vaciarCampos();
            this.productoClickedEvent.emit(producto);

            // this.productosService.newProducto(producto).subscribe(
            //     (respuesta) => {
            //         console.log(respuesta);
            //         
            //         this.productoClickedEvent.emit(this.catalogo);
            //     },
            //     (error) => {
            //         console.log(error);
            //     }
            // );


        } else {
            this.showModal = true;
            if (!this.catalogo) {
                this.mensajeModal = 'Seleccione un catálogo';
            } else {
                this.mensajeModal = 'Rellene todos los campos para continuar';
            }
            // this.showing = false;
        }
    }

    vaciarCampos () {
        this.formaProducto.value.codigoProducto = '';
        this.formaProducto.value.nombreProducto = '';
        this.formaProducto.value.cantidadProducto = '';
        this.formaProducto.value.precioProducto = '';

        this.cajaCodigoProducto.nativeElement.value = '';
        this.cajaNombreProducto.nativeElement.value = '';
        this.cajaCantidadProducto.nativeElement.value = '';
        this.cajaPrecioProducto.nativeElement.value = '';
    }

    dialogDismiss($event) {
        this.showModal = false;
    }
}
