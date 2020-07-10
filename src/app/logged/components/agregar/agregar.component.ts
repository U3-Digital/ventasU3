import { Component, OnInit } from '@angular/core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faCheck} from '@fortawesome/free-solid-svg-icons'
import { CatalogosService } from 'src/app/services/catalogos.service';
import { CatalogoModel } from 'src/app/models/catalogo.model';
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

    opciones: String[] = ['Pedido', 'Cliente', 'Catálogo', 'Producto'];
    childClicked: string;
    icon = faCheck;

    mensajeCatalogoModal = '';
    showCatalogoModal = false;
    tipoCatalogo = 'success';

    constructor(private catalogoService: CatalogosService) { }

    ngOnInit() {
    }

    recibirChildClicked($event) {
    this.childClicked = $event;
    }

    showForm(nombre) {
        return nombre === this.childClicked;
    }

    recibirCatalogoEvent($event) {

        this.showCatalogoModal = false;

        if ($event.valid === true) {

            let catalogo: CatalogoModel = new CatalogoModel();
            catalogo.nombre = $event.value.nombre;
            catalogo.ganancia = $event.value.ganancia;

            this.catalogoService.newCatalogo(catalogo).subscribe(
                (respuesta) => {
                    this.icon = faCheck;
                    this.tipoCatalogo = 'success';
                    this.mensajeCatalogoModal = 'Catálogo añadido exitosamente';
                    this.showCatalogoModal = true;
                },
                (error) => {
                    console.log(error);
                }
            );

        } else {
            this.icon = faExclamationTriangle;
            this.tipoCatalogo = 'error';
            this.mensajeCatalogoModal = 'Complete todos los campos para continuar';
            this.showCatalogoModal = true;
            console.log($event.status);
        }

    }
}
