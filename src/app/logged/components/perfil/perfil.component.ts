import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, AfterViewInit {

    FotoPerfil = "https://images.assetsdelivery.com/compings_v2/solargaria/solargaria1707/solargaria170700111.jpg";
    FotoPerfilAlt = "Foto de perfil";
    Nombre = "Juanita";
    Apellido = "Perez";
    Email = "juanita.perez@gmail.com";
    Telefono = "625-123-1234";
    Editando = false;
    @ViewChild('nameInput', null) nameInput;

    constructor() { }

    ngOnInit() {
      
    }

    ngAfterViewInit() {
        
    }

    editar () {
        this.Editando = !this.Editando;
    }

    guardar () {
        this.Editando = false;
    }

}
