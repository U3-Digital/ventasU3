import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, AfterViewInit {

    fotoPerfil: string;
    fotoPerfilAlt = 'Foto de perfil';
    nombre = '';
    email = '';
    telefono = '';
    editando = false;
    cambiado = false;
    usuario:any;


    formaPerfil: FormGroup;

    @ViewChild('nameInput', {}) nameInput;
    @ViewChild('botonGuardar', {}) botonGuardar;

    constructor(private formBuilder: FormBuilder) {
        this.usuario = JSON.parse(localStorage.getItem('info-usuario'));

        console.log(this.usuario);

        this.nombre = this.usuario.nombre;
        this.email = this.usuario.email;
        this.telefono = '6251231234';
        this.fotoPerfil = this.usuario.img;
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
            () => {
                this.botonGuardar.nativeElement.disabled = false;
            }
        );
    }

    crearFormulario(): void {
        this.formaPerfil = this.formBuilder.group({
            nombre: [this.nombre, [Validators.required]],
            email: [this.email, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
            telefono: [this.telefono, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
            password: [''],
            confirmarPasword: ['']
        });
    }

   

    editar(): void {
        console.log(this.formaPerfil.value);
        this.editando = !this.editando;

        if (this.editando === false) {
            this.botonGuardar.nativeElement.disabled = true;
        }
    }

    guardar(): void {
        this.editando = false;
        this.botonGuardar.nativeElement.disabled = true;
    }
  
}
