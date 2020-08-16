import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faEdit, faTrash, faCheck, faExclamationTriangle, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

    iconoEditar = faEdit;
    iconoBorrar = faTrash;

    usuarios: any[] = [];

    usuarioActual: UsuarioModel = new UsuarioModel();

    formaUsuario: FormGroup;
    value: any;
    role = true;

    editando = false;

    mensaje: string;
    showModal: boolean;
    tipoModal: string;
    iconoModal: IconDefinition;

    // Childs
    @ViewChild('cajaNombre', {}) cajaNombre: ElementRef;
    @ViewChild('cajaEmail', {}) cajaEmail: ElementRef;
    @ViewChild('cajaPassword', {}) cajaPassword: ElementRef;
    @ViewChild('cajaConfirmarPassword', {}) cajaConfirmarPassword: ElementRef;

    constructor(private usuariosService: UsuariosService, private formBuilder: FormBuilder) {

        this.recargarUsuarios();
        console.log(this.usuarios);
        this.crearFormulario();
        console.log(this.formaUsuario.value);
        this.iconoModal = faExclamationTriangle;

    }

    ngOnInit(): void {
    }

    crearFormulario() {
        this.formaUsuario = this.formBuilder.group({
            nombre: ['', Validators.required],
            email: ['', [ Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
            role: ['USER_ROLE', Validators.required]
        });
    }

    dialogDismiss($event) {
        this.showModal = false;
    }

    isLast(index: number) {
        if (index === this.usuarios.length - 1) {
            return true;
        } else {
            return false;
        }
    }

    editar(index: number) {
        this.editando = true;
        this.setUsuarioActual(index);

        this.cajaNombre.nativeElement.value = this.usuarioActual.nombre;
        this.cajaEmail.nativeElement.value = this.usuarioActual.email;

        this.formaUsuario.value.nombre = this.usuarioActual.nombre;
        this.formaUsuario.value.email = this.usuarioActual.email;
        console.log(this.formaUsuario.value);
    }

    borrar(index: number) {

        const usuarioBorrar = this.usuarios[index];

        this.usuariosService.deleteUsuario(usuarioBorrar._id).subscribe(
            (respuesta) => {
                this.iconoModal = faCheck;
                this.showModal = true;
                this.tipoModal = 'success';
                this.mensaje = 'Usuario borrado exitosamente';
            },
            (error) => {
                console.log(error);
            }
        );
    }

    setUsuarioActual(index) {
        this.usuarioActual = this.usuarios[index];
    }

    limpiar() {

        this.formaUsuario.reset();
    }

    submit() {
        this.showModal = false;

        if (this.editando === true) {

            if (this.formaUsuario.value.password) {
                if (this.formaUsuario.value.password === this.formaUsuario.value.confirmPassword) {
                    console.log('bien');

                    const usuarioActualizado = {
                        _id: this.usuarioActual._id,
                        nombre: this.cajaNombre.nativeElement.value,
                        email: this.cajaEmail.nativeElement.value,
                        password: this.cajaPassword.nativeElement.value,
                        role: this.formaUsuario.value.role
                    };


                    this.usuariosService.updateUsuario(usuarioActualizado).subscribe(
                        (respuesta) => {
                            this.iconoModal = faCheck;
                            this.showModal = true;
                            this.tipoModal = 'success';
                            this.mensaje = 'Usuario actualizado exitosamente';
                            this.limpiar();
                            this.recargarUsuarios();
                        },
                        (error) => {
                            this.showModal = true;
                            this.tipoModal = 'error';
                            this.mensaje = 'No se pudo actualizar el usuario';
                        }
                    );

                    this.limpiar();
                    this.editando = false;
                } else {
                    this.showModal = true;
                    this.tipoModal = 'error';
                    this.mensaje = 'Las contraseñas deben coincidir';
                }
            } else {

                const usuarioActualizado = {
                    _id: this.usuarioActual._id,
                    nombre: this.cajaNombre.nativeElement.value,
                    email: this.cajaEmail.nativeElement.value,
                    role: this.formaUsuario.value.role
                };

                this.usuariosService.updateUsuario(usuarioActualizado).subscribe(
                    (respuesta: any) => {
                        this.showModal = true;
                        this.tipoModal = 'success';
                        this.mensaje = 'Usuario actualizado exitosamente';
                        this.limpiar();
                        this.recargarUsuarios();
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            }

        } else {
            if (this.formaUsuario.valid === true) {

                if (this.formaUsuario.value.password === this.formaUsuario.value.confirmPassword) {
                    this.usuarioActual.nombre = this.formaUsuario.value.nombre;
                    this.usuarioActual.email = this.formaUsuario.value.email;
                    this.usuarioActual.password = this.formaUsuario.value.password;

                    let rol: string;

                    if (this.role === true) {
                        rol = 'USER_ROLE';
                    } else {
                        rol = 'ADMIN_ROLE';
                    }

                    this.usuarioActual.role = rol;

                    this.usuariosService.newUsuario(this.usuarioActual).subscribe(
                            (respuesta: any) => {
                                this.limpiar();
                                this.usuarios.push(respuesta.usuario);
                                this.tipoModal = 'success';
                                this.mensaje = '¡Usuario agregado exitosamente!';
                                this.showModal = true;
                            },
                            (error) => {
                                console.log(error);
                            }
                        );

                }

                this.showModal = true;
                this.tipoModal = 'error';
                this.mensaje = 'Las contraseñas deben coincidir';
                // this.showModal = true;
                // this.mensaje = 'Usuario añadido exitosamente';

            } else {
                this.showModal = true;
                this.tipoModal = 'error';
                this.mensaje = 'Rellene todos los campos para continuar';
            }
        }


    }

    cambio(isUsuario: boolean) {
        this.role = isUsuario;

    }

    recargarUsuarios() {
        this.usuarioActual = new UsuarioModel();
        this.usuarios = [];

        this.usuariosService.getUsuarios()
        .subscribe(
            (respuesta: any) => {
                respuesta.usuarios.forEach((usuario: any) => {
                    this.usuarios.push(usuario);
                });
            },
            (error) => {
                console.log(error);
            }
        );

    }

    cosa() {
        console.log(this.formaUsuario.value);
    }

    get nombreNoValido() {
        return this.formaUsuario.get('nombre').invalid && this.formaUsuario.get('nombre').touched;
    }

    get emailNoValido() {
        return this.formaUsuario.get('email').invalid && this.formaUsuario.get('email').touched;
    }

    get passwordNoValida() {
        return this.formaUsuario.get('password').invalid && this.formaUsuario.get('password').touched;
    }

    get confirmarPasswordNoValida() {
        return this.formaUsuario.get('confirmPassword').invalid && this.formaUsuario.get('confirmPassword').touched;
    }

}
