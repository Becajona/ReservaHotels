import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavegacionModule } from './navegacion/navegacion.module'; 
import { ReservacionesModule } from './reservaciones/reservaciones.module';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavegacionModule,
    ReservacionesModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
