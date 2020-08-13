import { Component, OnInit, Input,  HostListener, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

    closeIcon = faTimes;
    // errorIcon = faExclamationTriangle;

    @Input() message: string;
    @Input() showing = false;
    @Input() icon: any;
    @Input() type: string;

    @ViewChild('modalContent', {}) modal: ElementRef;
    @ViewChild('close', {}) cerrar: ElementRef;

    @Output() onDismiss = new EventEmitter<any>();

    constructor() {
        // console.log(this.cerrar);
        // this.cerrar.nativeElement.onclick = this.close();
    }

    ngOnInit(): void {
        switch (this.type) {
            case 'success':
                this.icon = faCheck;
                break;
            case 'error':
                this.icon = faExclamationTriangle;
                break;
            default:
                this.icon = faExclamationTriangle;
                break;
        }
    }

    dismiss() {
        this.onDismiss.emit('');

    }

    close() {
        this.onDismiss.emit('');
    }

    // @HostListener('document:click', ['$event'])
    // onDocumentClick(event: MouseEvent) {

    //     if (event.target === this.modal.nativeElement) {

    //     } else {
    //         this.showing = false;
    //     }
    // }

}
