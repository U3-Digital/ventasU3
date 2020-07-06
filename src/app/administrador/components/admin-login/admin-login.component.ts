import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

    formaLogin: FormGroup;

    constructor(private formBuilder: FormBuilder) {

        this.crearFormulario();
    }

    ngOnInit() {
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
        console.log(this.formaLogin.valid);

        if (this.formaLogin.invalid) {
            return Object.values(this.formaLogin.controls).forEach((control) => {
                control.markAsTouched();
            })
        }

    }

}
