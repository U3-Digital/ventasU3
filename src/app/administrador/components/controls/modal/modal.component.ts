import { Component, OnInit, Input,  HostListener, Output, EventEmitter} from '@angular/core';
import { faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

    closeIcon = faTimes;
    icon: IconDefinition;

    @Input() message: string;
    @Input() showing = false;
    @Input() type: string;

    @Output() ondismiss = new EventEmitter<any>();

    constructor() {
        if (this.type === 'success') {
            this.icon = faCheck;
        } else {
            this.icon = faExclamationTriangle;
        }
    }

    ngOnInit(): void {
    }

    dismiss() {
        this.ondismiss.emit('');
    }

    close() {
        this.ondismiss.emit('');
    }

}
