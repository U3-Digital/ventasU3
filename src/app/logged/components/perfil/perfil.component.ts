import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, AfterViewInit {

    FotoPerfil = '../../../assets/img/default.jpg';
    FotoPerfilAlt = 'Foto de perfil';
    Nombre = '';
    Email = '';
    Telefono = '';
    Editando = false;
    Cambiado = false;
    usuario:any;


    formaPerfil: FormGroup;

    @ViewChild('nameInput', {}) nameInput;
    @ViewChild('botonGuardar', {}) botonGuardar;

    constructor(private formBuilder: FormBuilder) {
        this.usuario = JSON.parse(localStorage.getItem('info-usuario'));
        this.Nombre = this.usuario.nombre;
        this.Email = this.usuario.email;
        this.Telefono = '6251231234';
        
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
