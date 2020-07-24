import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    iconCerrar = faChevronLeft;

    @ViewChild('sidebar', {}) sidebar: ElementRef;
    @ViewChild('cosa', {}) cosa: any;

    constructor() { }

    ngOnInit(): void {
    }

    abrirSideBar() {
        this.sidebar.nativeElement.style.width = "15em";
    }

    cerrarSideBar() {
        this.sidebar.nativeElement.style.width = "0";
    }

    @HostListener('document:click', ['$event']) 
    onDocumentClick(event: MouseEvent) {
        if ((event.target != this.sidebar.nativeElement) && (event.target != this.cosa.btnTopbar.nativeElement)) {
            this.cerrarSideBar();
        }
    }

    

}
