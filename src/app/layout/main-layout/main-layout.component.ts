import { Component } from '@angular/core';

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss'],
    standalone: false
})
export class MainLayoutComponent {
    menuAbierto = false;

    toggleMenu(): void {
      this.menuAbierto = !this.menuAbierto;
    }
    
    cerrarMenu(): void {
      this.menuAbierto = false;
    }
    
      
}
