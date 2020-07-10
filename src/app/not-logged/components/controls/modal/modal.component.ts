import { Component, OnInit, Input,  HostListener} from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

    closeIcon = faTimes;
    errorIcon = faExclamationTriangle;

    @Input() message: string;
    @Input() showing: boolean = false;

    // @Input() onDismiss: ;

    constructor() { }

    ngOnInit(): void {
    }

    dismiss() {
        this.showing = false;
    }

    close () {
        this.showing = false;
    }

    @HostListener('document:click', ['$event']) 
    onDocumentClick(event: MouseEvent) {
        
        if ((event.target != document.getElementById('modal-content'))) {
            this.showing = false;
        }
    }

}
