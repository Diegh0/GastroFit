import { Component, OnInit } from '@angular/core';
import { AfiliadoProducto, Comida } from 'src/app/core/models/comida.model';
import { ComidaService } from 'src/app/core/services/comida.service';
import { IaHistoryService } from 'src/app/core/services/ia-history.service';
import { combineLatest, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { AffiliateService } from 'src/app/services/affiliate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comidas',
  templateUrl: './comidas.component.html',
  styleUrls: ['./comidas.component.scss'],
  standalone: false
})
export class ComidasComponent implements OnInit {
  comidas: Comida[] = [];
  mostrarSoloFavoritos: boolean = false;
  comidasIA: Comida[] = [];

  constructor(private comidaService: ComidaService,private iaHistoryService: IaHistoryService,public affiliate: AffiliateService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    // 1. Obtener comidas normales
    this.comidas = await this.comidaService.getComidas();
  
    // 2. Obtener comidas IA (Promise<Observable<...>> → await + firstValueFrom)
    const ia$ = await this.iaHistoryService.getIaHistory();
    const iaEntries = await firstValueFrom(ia$);
  
    const validEntries = iaEntries.filter(entry =>
      entry.recipeId && entry.nombre && entry.dia && entry.tipo
    );
  
    this.comidasIA = validEntries.map(entry => ({
      id: entry.recipeId,
      nombre: entry.nombre,
      ingredientes: entry.ingredientes ?? [],
      imagenUrl: '',
      favorita: entry.favorita ?? false,
      fechaCreacion: entry.fechaGeneracion,
      source: 'ia'
    }));
  
    // 3. Productos afiliados
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
        title: 'TTSTOlEE ustensiles de cocina de silicona 11 elementos, mango de madera',
        asin: 'B0DTDSN252',
        imageUrl: 'https://m.media-amazon.com/images/I/613g6of-1DL._AC_SX679_.jpg'
      },
      {
        title: 'Juego de Cuchillos Acero Inoxidable con Funda',
        asin: 'B07PPYY3RS',
        imageUrl: 'https://m.media-amazon.com/images/I/71MvdX8pMBL._AC_SX679_.jpg'
      },
      {
        title: 'MasterChef Báscula Digital',
        asin: 'B09GFM52DK',
        imageUrl: 'https://m.media-amazon.com/images/I/51GYbYgelCL._SX522_.jpg'
      },
      {
        title: 'Pulverizador Aceite Spray 2 en 1',
        asin: 'B0CJF94M8J',
        imageUrl: 'https://m.media-amazon.com/images/I/71nv-DarueL._AC_SX679_.jpg'
      },
      {
        title: 'XINZUO Cuchillos Damasco con Bloque de Madera',
        asin: 'B083J5H921',
        imageUrl: 'https://m.media-amazon.com/images/I/71rv+4Cw44L._AC_SX679_.jpg'
      }
    ];
  
    this.affiliateProducts = productosRaw.map(p => ({
      ...p,
      link: this.affiliate.getAmazonLink(p.asin)
    }));
  }
  affiliateProducts: AfiliadoProducto[] = [];

  // Método para abrir el enlace (puedes usarlo en la plantilla si no usas [href])
  comprarEnAmazon(link: string) {
   window.open(link, '_blank');
 }

  agregarComida(nueva: Comida): void {
    this.comidas.push(nueva); // 👈 Añadir sin recargar
  }

  toggleFavorito(comida: Comida): void {
    const index = this.comidas.findIndex(c => c.id === comida.id);
    if (index !== -1) {
      this.comidas[index].favorita = !this.comidas[index].favorita;
      this.comidaService.setComidas(this.comidas);
    }
  }
  

  eliminarComida(comida: Comida): void {
    this.comidas = this.comidas.filter(c => c.id !== comida.id);
    this.comidaService.setComidas(this.comidas);
  }
  

  get comidasFiltradas(): Comida[] {
    return this.mostrarSoloFavoritos
      ? this.comidas.filter(c => c.favorita)
      : this.comidas;
  }
  toggleFavoritoIA(comida: Comida): void {
    const index = this.comidasIA.findIndex(c => c.id === comida.id);
    if (index !== -1) {
      this.comidasIA[index].favorita = !this.comidasIA[index].favorita;
      // Puedes guardar los cambios si decides persistir favoritos IA en Firestore
    }
  }
  
  eliminarComidaIA(comida: Comida): void {
    this.comidasIA = this.comidasIA.filter(c => c.id !== comida.id);
    this.iaHistoryService.deleteByRecipeId(comida.id!);
  }
  irAMenuInteligente(): void {
    this.router.navigate(['/ia']);
  }
  
}
