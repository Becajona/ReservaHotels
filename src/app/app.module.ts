import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavegacionModule } from './navegacion/navegacion.module'; 
import { ReservacionesModule } from './reservaciones/reservaciones.module';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { InicioComponent } from './reservaciones/inicio/inicio.component';
import { environment } from 'src/environments/environment.prod';

import { RegistrarseInicioComponent } from './check/registrarse-inicio/registrarse-inicio.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrarseInicioComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavegacionModule,
    ReservacionesModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFirestoreModule // Importar Firestore
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
