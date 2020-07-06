import { Component, OnInit, ViewChild, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

    @ViewChild('dropdownContent', null) dropdownContent: ElementRef;

    @Input() opciones: string[];
    @Input() titulo: string;

    @Output() childClickedEvent = new EventEmitter<String>();
    
    faChevronDown = faChevronDown;
    showing = false;
    clase = 'dropdown-content';
    claseShowing = 'dropdown-content show';

    constructor() {       
    }

    sendChildClicked(index) {
        let opcion = this.titulo = this.opciones[index];
        this.childClickedEvent.emit(opcion);
    }

    ngOnInit() {
    }

    showContent() {
        if (this.showing == true ) {
            this.showing = false;
        } else {
            this.showing = true;
        }
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
        
        if ((event.target == document.getElementById('dropdown-button'))) {
            
        } else {
            this.showing = false;
        }
    }

}
