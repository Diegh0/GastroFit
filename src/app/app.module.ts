import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ComidasModule } from './features/comidas/comidas.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent
  ],
    imports:[
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ComidasModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
