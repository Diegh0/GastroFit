import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirebaseApp } from '@angular/fire/app';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ComidasModule } from './features/comidas/comidas.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment.prod';
import { initializeApp } from '@angular/fire/app';
import { FirebaseConfigModule } from './firebase-config/firebase-config.module';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
  
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FirebaseConfigModule,
    RouterModule,
    ComidasModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    
  ]
  ,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
