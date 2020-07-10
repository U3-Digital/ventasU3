import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { AdminModel } from '../../../models/admin.model';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

    formaLogin: FormGroup;

    admin: AdminModel;
    showModal: boolean = false;

    constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) {

        this.crearFormulario();
    }

    ngOnInit() {
        this.admin = new AdminModel();
    }

    get correoNoValido () {
        return this.formaLogin.get('email').invalid && this.formaLogin.get('email').touched;
    }

    get passwordNoValida () {
        return this.formaLogin.get('password').invalid && this.formaLogin.get('password').touched;
    }

    crearFormulario () {
        this.formaLogin = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
            password: ['', Validators.required]
        });
    }

    submit () {
        this.showModal = false;
        if (this.formaLogin.invalid) {
            return Object.values(this.formaLogin.controls).forEach((control) => {
                control.markAsTouched();
            })
        } else {

            this.admin.email = this.formaLogin.value.email;
            this.admin.password = this.formaLogin.value.password;

            this.auth.loginAdmin(this.admin).subscribe(
                (respuesta) => {

                    if (respuesta['usuarioDB'].role === 'USER_ROLE') {
                        this.showModal = true;
                        localStorage.removeItem('token');
                    } else {
                        this.saveUserInfo(respuesta['usuarioDB']);
                        this.router.navigateByUrl('/admin/inicio');
                    }

                    
                }, (error) => {
                    this.showModal = true;
                 }
                
            );
        }

    }

    saveUserInfo (info: any) {
        
        let usuario = {
            id : info._id,
            email : info.email,
            nombre : info.nombre,
            role : info.role,
            estado : info.estado,
            google : info.google,
        };

        localStorage.setItem('info-usuario', JSON.stringify(usuario));

    }

}
