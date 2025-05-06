import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, query, orderBy } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { ChartConfiguration } from 'chart.js';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-progreso',
  templateUrl: './progreso.component.html',
  styleUrls: ['./progreso.component.scss'],
  imports:[MatCardModule,NgChartsModule,MatTableModule,MatPaginatorModule,MatSortModule,MatTabsModule,CommonModule,MatProgressSpinnerModule]
})
export class ProgresoComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('chart') chart!: BaseChartDirective;

  dataSourceMensual = new MatTableDataSource<{ mes: string; valor: number }>();

  pesos: { mes: string; valor: number }[] = []; // inicializa con array vacío

  displayedColumns: string[] = ['mes', 'peso'];
  columnasMensual: string[] = ['mes', 'valor'];
  columnasHistorial: string[] = ['fecha', 'valor'];

  todosLosPesos: { fecha: string; valor: number }[] = [];
  mostrarTodos: boolean = false;
  
  chartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Peso (kg)',
        fill: true,
        tension: 0.3,
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63,81,181,0.1)',
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  };

  chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      x: {},
      y: {
        beginAtZero: false
      }
    }
  };

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    
  ) {}

 ngAfterViewInit(): void {
  // Esperamos al DOM + tabs renderizados
  setTimeout(() => {
    const tabGroup = document.querySelector('mat-tab-group');
    const activeTab = tabGroup?.querySelector('.mat-tab-body-active');

    // Solo actualizamos si la pestaña de evolución mensual está activa
    if (activeTab && activeTab.textContent?.includes('Gráfica')) {
      this.chart?.update();
    }
  }, 200);
}

  
  onTabChange(event: any) {
    if (event.index === 0) {
      setTimeout(() => {
        this.chart?.update();
      }, 50); // pequeño retraso para asegurar render completo
    }
  }
  
  
  async ngOnInit() {
    const uid = await this.authService.getUserIdAsync();
    const pesosRef = collection(this.firestore, `users/${uid}/pesos`);
    const q = query(pesosRef, orderBy('fecha'));
  
    const snapshot = await getDocs(q);
  
    const pesosPorMes = new Map<string, { fecha: Date; valor: number }>();
  
    this.todosLosPesos = []; // Reinicia el array por si acaso
  
    snapshot.forEach(doc => {
      const data = doc.data();
      const fecha: Date = data['fecha'].toDate();
      const valor: number = data['valor'];
  
      const mesClave = `${fecha.getFullYear()}-${(fecha.getMonth() + 1)
        .toString()
        .padStart(2, '0')}`;
  
      if (!pesosPorMes.has(mesClave) || fecha > pesosPorMes.get(mesClave)!.fecha) {
        pesosPorMes.set(mesClave, { fecha, valor });
      }
  
      this.todosLosPesos.push({
        fecha: fecha.toLocaleDateString(),
        valor
      });
    });
  
    // Ordenar por fecha descendente el historial completo
    this.todosLosPesos.sort((a, b) => {
      const fechaA = new Date(a.fecha).getTime();
      const fechaB = new Date(b.fecha).getTime();
      return fechaB - fechaA;
    });
  
    // Datos para gráfica y tabla mensual
    const datosOrdenados = Array.from(pesosPorMes.entries()).sort(
      (a, b) => a[1].fecha.getTime() - b[1].fecha.getTime()
    );
  
    const labels: string[] = [];
    const datos: number[] = [];
  
    datosOrdenados.forEach(([mesClave, { fecha, valor }]) => {
      const label = `${fecha.toLocaleString('default', {
        month: 'long'
      })} ${fecha.getFullYear()}`;
      labels.push(label);
      datos.push(valor);
    });
  
    this.chartData.labels = labels;
    this.chartData.datasets[0].data = datos;
  
    // Construir tabla mensual paginada
    this.pesos = labels.map((label, index) => ({
      mes: label,
      valor: datos[index]
    }));
  
    this.dataSourceMensual.data = this.pesos;

    setTimeout(() => {
      this.dataSourceMensual.paginator = this.paginator;
    });
    setTimeout(() => {
      this.chart?.update();
      this.graficaLista = true;
    }, 100); // pequeña espera tras pintar

  }
  graficaLista = false;


}
