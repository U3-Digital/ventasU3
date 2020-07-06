import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, AfterViewInit {

    FotoPerfil = "https://www.westernunion.com/content/dam/wu/jm/responsive/send-money-in-person-from-jamaica-resp.png";
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
        console.log(this.nameInput);
        this.Editando = !this.Editando;
    }

    guardar () {
        this.Editando = false;
    }

}
