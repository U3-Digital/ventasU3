import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    formaLoginUsuario: FormGroup;

    user: UserModel;
    showModal = false;

    constructor(private router: Router, private formBuilder: FormBuilder, private auth: AuthService) {
        this.crearFormulario();
    }

    ngOnInit() {
        this.user = new UserModel();
    }

    crearFormulario() {
        this.formaLoginUsuario = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
            password: ['', [Validators.required]]
        });
    }

    get correoNoValido() {
        return this.formaLoginUsuario.get('email').invalid && this.formaLoginUsuario.get('email').touched;
    }

    get passwordNoValida() {
        return this.formaLoginUsuario.get('password').invalid && this.formaLoginUsuario.get('password').touched;
    }

    submit() {
        this.showModal = false;
        if (this.formaLoginUsuario.invalid) {
            return Object.values(this.formaLoginUsuario.controls).forEach((control) => {
                control.markAsTouched();
            });
        } else {

            this.user.email = this.formaLoginUsuario.value.email;
            this.user.password = this.formaLoginUsuario.value.password;

            this.auth.login(this.user).subscribe(
                (respuesta: any) => {
                    // console.log(respuesta['usuarioDB'].role);

                    if (respuesta.usuarioDB.role === 'ADMIN_ROLE') {
                        this.showModal = true;
                        localStorage.removeItem('token');
                    } else {
                        this.saveUserInfo(respuesta.usuarioDB);
                        this.router.navigateByUrl('/logged/inicio');
                    }

                }, (error) => {
                    // console.log(error.error.err.message);
                    this.showModal = true;
                 }

            );
        }
    }

    saveUserInfo(info: any) {

        const usuario = {
            id : info._id,
            email : info.email,
            nombre : info.nombre,
            role : info.role,
            estado : info.estado,
            google : info.google,
            img : info.img
        };

        localStorage.setItem('info-usuario', JSON.stringify(usuario));

    }
}
