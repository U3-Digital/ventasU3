import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    formaLoginUsuario: FormGroup;

    constructor(private router: Router, private formBuilder: FormBuilder) { 
        this.crearFormulario();
    }

    ngOnInit() {
    }

    crearFormulario() {
        this.formaLoginUsuario = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
            password: ['', [Validators.required]]
        });
    }

    submit () {
        
    }

    entrar () {
        this.router.navigate(['/logged/inicio']);
    }

}
