import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, AfterViewInit {

    fotoPerfil: any;
    fotoPerfilAlt = 'Foto de perfil';
    nombre = '';
    email = '';
    telefono = '';
    editando = false;
    cambiado = false;
    usuario: any;
    idUsuario: string;

    formaPerfil: FormGroup;

    @ViewChild('nameInput', {}) nameInput: ElementRef;
    @ViewChild('emailInput', {}) emailInput: ElementRef;
    @ViewChild('telefonoInput', {}) telefonoInput: ElementRef;
    @ViewChild('passwordInput', {}) passwordInput: ElementRef;
    @ViewChild('confirmPasswordInput', {}) confirmPasswordInput: ElementRef;
    @ViewChild('imgInput', {}) imgInput: ElementRef;
    @ViewChild('toggleModal', {}) toggleModal: ElementRef;

    @ViewChild('botonGuardar', {}) botonGuardar: ElementRef;

    showingModal = false;
    messageModal: string;
    typeModal: string;

    srcPreview: any;

    @ViewChild('modal', {}) modal: ElementRef;

    constructor(private formBuilder: FormBuilder, private usuariosService: UsuariosService) {
        this.getInfoUsuario();
    }

    ngOnInit() {
        this.crearFormulario();
        this.formChanged();
    }

    ngAfterViewInit() {
        this.botonGuardar.nativeElement.disabled = true;
    }

    formChanged() {
        this.formaPerfil.valueChanges.subscribe(() => {
            this.botonGuardar.nativeElement.disabled = false;
        });
    }

    getInfoUsuario() {
        this.idUsuario = JSON.parse(localStorage.getItem('info-usuario')).id;

        this.usuariosService.getSelfUsuario(this.idUsuario).subscribe(
            (respuesta: any) => {
                const usuario = respuesta.usuarioDB;
                this.fotoPerfil = usuario.img;
                this.srcPreview = usuario.img;

                this.nameInput.nativeElement.value = usuario.nombre;
                this.emailInput.nativeElement.value = usuario.email;
                this.telefonoInput.nativeElement.value = usuario.telefono;

                this.nombre = usuario.nombre;
                this.email = usuario.email;
                this.telefono = usuario.telefono;

            },
            (error) => {
                console.log(error);
            }
        );
    }

    crearFormulario() {
        this.formaPerfil = this.formBuilder.group({
            nombre: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
            telefono: ['', [Validators.required, Validators.minLength(10)]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    toggleEdicion() {
        this.editando = !this.editando;
        if (this.editando === true) {
            this.rellenarForma();
        }
    }

    rellenarForma() {
        this.formaPerfil.value.nombre = this.nombre;
        this.formaPerfil.value.email = this.email;
        this.formaPerfil.value.telefono = this.telefono;
    }

    actualizarPerfil() {
        this.showingModal = false;

        if (this.nameInput.nativeElement.value && this.emailInput.nativeElement.value
            && this.telefonoInput.nativeElement.value) {

            if (this.passwordInput.nativeElement.value) {

                if (this.passwordInput.nativeElement.value === this.confirmPasswordInput.nativeElement.value) {

                    const parametros = {
                        idUsuario: this.idUsuario,
                        nombreUsuario: this.nameInput.nativeElement.value,
                        emailUsuario: this.emailInput.nativeElement.value,
                        telefonoUsuario: this.telefonoInput.nativeElement.value,
                        passwordUsuario: this.passwordInput.nativeElement.value
                    };

                    this.usuariosService.updateSelfUsuario(parametros).subscribe(
                        (respuesta: any) => {
                            console.log(respuesta);
                            this.toggleEdicion();
                            window.location.reload();
                            console.log('todo chido mjp');
                        },
                        (error) => {
                            console.log(error);
                        }
                    );

                } else {
                    this.showingModal = true;
                    this.messageModal = 'Rellene los campos necesarios';
                    this.typeModal = 'error';
                }

            } else {
                if (this.confirmPasswordInput.nativeElement.value) {

                    this.showingModal = true;
                    this.messageModal = 'Rellene los campos necesarios';
                    this.typeModal = 'error';

                } else {
                    const parametros = {
                        idUsuario: this.idUsuario,
                        nombreUsuario: this.nameInput.nativeElement.value,
                        emailUsuario: this.emailInput.nativeElement.value,
                        telefonoUsuario: this.telefonoInput.nativeElement.value
                    };

                    this.usuariosService.updateSelfUsuario(parametros).subscribe(
                        (respuesta: any) => {
                            console.log(respuesta);
                            this.toggleEdicion();
                            window.location.reload();
                        },
                        (error) => {
                            console.log(error);
                        }
                    );
                }
            }

        } else {
            this.showingModal = true;
            this.messageModal = 'Rellene los campos necesarios';
            this.typeModal = 'error';
        }
    }

    onModalDismiss($event) {
        this.showingModal = false;
    }

    openModal() {
        this.toggleModal.nativeElement.click();
        // console.log(this.modal.nativeElement);
        // this.imgInput.nativeElement.click();
    }

    openFilePrompt() {
        this.imgInput.nativeElement.click();
    }

    previewImage($event: any) {
        if ($event.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL($event.target.files[0]);
            reader.onload = () => {
            this.srcPreview = reader.result;
            };
        }

    }

    uploadImage() {
        if (this.srcPreview === this.fotoPerfil) {
            console.log('no');
        } else {
            console.log('si');
        }
    }

}
