import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AfiliadoProducto, Comida } from 'src/app/core/models/comida.model';
import { AffiliateService } from 'src/app/services/affiliate.service';

@Component({
    selector: 'app-comida-list',
    templateUrl: './comida-list.component.html',
    styleUrls: ['./comida-list.component.scss'],
    standalone: false
})
export class ComidaListComponent {
  @Input() comidas: Comida[] = [];
  @Output() favoritoCambiado = new EventEmitter<Comida>();
  @Output() comidaEliminada = new EventEmitter<Comida>();

  constructor(public affiliate: AffiliateService) {}

  affiliateProducts: AfiliadoProducto[] = [];

   // Método para abrir el enlace (puedes usarlo en la plantilla si no usas [href])
   comprarEnAmazon(link: string) {
    window.open(link, '_blank');
  }

  toggleFavorito(comida: Comida): void {
    this.favoritoCambiado.emit(comida);
  }

  eliminarComida(comida: Comida): void {
    this.comidaEliminada.emit(comida);
    
  }

  ngOnInit() {
    // 2) Define tus productos (título, ASIN, URL de imagen)
    const productosRaw = [
      {
        title: 'Cecotec Robot de Cocina Multifunción Mambo',
        asin: 'B0BJQQ78BY',
        imageUrl: 'https://m.media-amazon.com/images/I/51sB4hpk8OL._AC_SL1000_.jpg'
      },
      {
        title: 'Juego de sartenes antiadherentes',
        asin: 'B074RPCNMX',
        imageUrl: 'https://m.media-amazon.com/images/I/81COU6udPbL._AC_SX679_.jpg'
      },
      {
        title: 'TTSTOlEE ustensiles de cuisine, utensilios de cocina de silicona 11elementos, manijas de madera, negro',
        asin: 'B0DTDSN252',
        imageUrl: 'https://m.media-amazon.com/images/I/613g6of-1DL._AC_SX679_.jpg'
      },
      {
        title: 'Juego de Cuchillos de Cocina Acero Inoxidable Negro con Mango Cómodo y Funda de Cuchillo',
        asin: 'B07PPYY3RS',
        imageUrl: 'https://m.media-amazon.com/images/I/71MvdX8pMBL._AC_SX679_.jpg'
      },
      {
        title: 'MasterChef Bascula de Cocina Digital',
        asin: 'B09GFM52DK',
        imageUrl: 'https://m.media-amazon.com/images/I/51GYbYgelCL._SX522_.jpg'
      },
      {
        title: ' Pulverizador Aceite Spray 470ml - 2 en 1',
        asin: 'B0CJF94M8J',
        imageUrl: 'https://m.media-amazon.com/images/I/71nv-DarueL._AC_SX679_.jpg'
      },
      {
        title: 'XINZUO Cuchillos de Cocina Forjados de Acero Damasco con Bloque de Madera de Acacia, Set de 7 Piezas',
        asin: 'B083J5H921',
        imageUrl: 'https://m.media-amazon.com/images/I/71rv+4Cw44L._AC_SX679_.jpg'
      },
      // …añade los que quieras
    ];

    // 3) Pre‑calcula el enlace con tu tag
    this.affiliateProducts = productosRaw.map(p => ({
      ...p,
      link: this.affiliate.getAmazonLink(p.asin)
    }));
  }
   
}
