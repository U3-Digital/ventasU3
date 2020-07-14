import { Component, OnInit, ViewChild, ElementRef, HostListener, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit, OnChanges {

    @ViewChild('dropdownButton', {}) dropdownButton: ElementRef;

    @ViewChild('dropdownContent', {}) dropdownContent: ElementRef;

    @Input() id:string;
    @Input() opciones: string[];
    @Input() datos: any[];
    @Input() titulo: string;
    @Input() sombra: boolean;

    @Output() childClickedEvent = new EventEmitter<any>();
    
    faChevronDown = faChevronDown;
    showing = false;
    clase = 'dropdown-content';
    claseShowing = 'dropdown-content show';

    constructor() {       
    }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges): void {
        
    }

    sendChildClicked(index) {
        let opcion = this.titulo = this.opciones[index];
        this.childClickedEvent.emit(this.datos[index]);
    }

    showContent() {
        this.showing = !this.showing;
        // console.log('sas');
        // if (this.showing == true ) {
        //     console.log('heu');
        //     this.showing = false;
        // } else {
        //     console.log('asa');
        //     this.showing = true;
        // }
    }


    isLast (index) {
        if (index === this.opciones.length - 1) {
            return true;
        } else {
            return false;
        }
    }

    @HostListener('document:click', ['$event']) 
    onDocumentClick(event: MouseEvent) {
        
        // console.log(document.getElementById('dropdown-button'));

        if (event.target === this.dropdownButton.nativeElement) {
            // console.log('hola');
        } else {
            this.showing = false;
        }
    }

}
