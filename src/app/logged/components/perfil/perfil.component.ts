import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, AfterViewInit {

    FotoPerfil = "https://www.westernunion.com/content/dam/wu/jm/responsive/send-money-in-person-from-jamaica-resp.png";
    FotoPerfilAlt = "Foto de perfil";
    Nombre = "Juanita";
    Apellido = "Perez";
    Email = "juanita.perez@gmail.com";
    Telefono = "6251231234";
    Editando = false;
    Cambiado = false;

    formaPerfil: FormGroup;

    @ViewChild('nameInput', null) nameInput;
    @ViewChild('botonGuardar', null) botonGuardar;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {    
        this.crearFormulario();
        this.onChanges();
    }

    ngAfterViewInit() {
        this.botonGuardar.nativeElement.disabled = true;
    }

    onChanges(): void {
        this.formaPerfil.valueChanges.subscribe(
            (val) => {
                this.botonGuardar.nativeElement.disabled = false;
            }
        );
    }

    crearFormulario(): void {
        this.formaPerfil = this.formBuilder.group({
            nombre: [this.Nombre, [Validators.required]],
            email: [this.Email, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
            telefono: [this.Telefono, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
            password: [''],
            confirmarPasword: ['']
        });
    }

   

    editar(): void {
        console.log(this.formaPerfil.value);
        this.Editando = !this.Editando;

        if (this.Editando === false) {
            this.botonGuardar.nativeElement.disabled = true;
        }
    }

    guardar(): void {
        this.Editando = false;
        this.botonGuardar.nativeElement.disabled = true;
    }
  
}
