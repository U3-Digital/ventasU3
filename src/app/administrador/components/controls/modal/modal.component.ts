import { Component, OnInit, Input,  HostListener, Output, EventEmitter} from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

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
    @Input() type: string;

    @Output() onDismiss = new EventEmitter<any>();

    // @Input() onDismiss: ;

    constructor() { }

    ngOnInit(): void {
    }

    dismiss() {
        this.onDismiss.emit('');
    }

    close () {
        this.onDismiss.emit('');
    }

    // @HostListener('document:click', ['$event']) 
    // onDocumentClick(event: MouseEvent) {
        
    //     if ((event.target != document.getElementById('modal-content'))) {
    //         this.showing = false;
    //     }
    // }

}
