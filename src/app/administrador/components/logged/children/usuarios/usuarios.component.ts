import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


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
    role: boolean = true;

    editando: boolean = false;

    mensaje: string;
    showModal: boolean;
    tipoModal: string;

    // Childs
    @ViewChild('cajaNombre', {}) cajaNombre: ElementRef;
    @ViewChild('cajaEmail', {}) cajaEmail: ElementRef;
    @ViewChild('cajaPassword', {}) cajaPassword: ElementRef;
    @ViewChild('cajaConfirmarPassword', {}) cajaConfirmarPassword: ElementRef;

    constructor(private usuariosService: UsuariosService, private formBuilder: FormBuilder) {

        this.usuariosService.getUsuarios()
        .subscribe(
            (respuesta) => {
                respuesta['usuarios'].forEach(usuario => {
                    this.usuarios.push(usuario);
                });
            },
            (error) => {
                console.log(error);
            }
        )

        this.crearFormulario();
        console.log(this.formaUsuario.value);

    }

    ngOnInit(): void {
    }

    crearFormulario() {
        this.formaUsuario = this.formBuilder.group({
            nombre: ['', Validators.required],
            email: ['',[ Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
            role: ['User', Validators.required]
        });
    }

    dialogDismiss($event) {
        this.showModal = false;
    }

    isLast(index) {
        if (index === this.usuarios.length - 1) {
            return true;
        } else {
            return false;
        }
    }

    editar(index) {
        this.editando = true;
        this.setUsuarioActual(index);

        this.cajaNombre.nativeElement.value = this.usuarioActual.nombre;
        this.cajaEmail.nativeElement.value = this.usuarioActual.email;

        this.formaUsuario.value.nombre = this.usuarioActual.nombre;
        this.formaUsuario.value.email = this.usuarioActual.email;
        
    }

    setUsuarioActual (index) {
        this.usuarioActual = this.usuarios[index];
    }

    limpiar() {
        // this.cajaNombre.nativeElement.value = '';
        // this.cajaEmail.nativeElement.value = '';
        // this.cajaPassword.nativeElement.value = '';
        // this.cajaConfirmarPassword.nativeElement.value = '';

        this.formaUsuario.reset()
    }

    submit() {

        this.showModal = false;

        if (this.editando === true) {

            if (this.formaUsuario.value.password) {
                
                if (this.formaUsuario.value.password === this.formaUsuario.value.confirmPassword) {
                    console.log('bien');


                    this.usuariosService.updateUsuario(this.usuarioActual).subscribe(
                        (respuesta) => {
                            console.log(respuesta);
                        },
                        (error) => {
                            console.log(error);
                        }  
                    );

                    this.limpiar();
                    this.editando = false;
                } else {
                    this.showModal = true;
                    this.tipoModal = 'error';
                    this.mensaje = 'Las contraseñas deben coincidir';
                }
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
                            (respuesta) => {
                                this.limpiar();
                                this.usuarios.push(respuesta['usuario']);
                                this.tipoModal = 'success';
                                this.mensaje = '¡Usuario agregado exitosamente!';
                                this.showModal = true;
                            }, 
                            (error) => {
                                console.log(error);
                            }
                        )
                    
    
                    
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
}
