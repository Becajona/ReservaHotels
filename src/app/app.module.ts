import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment.prod';
import { RegistrarseInicioComponent } from './check/registrarse-inicio/registrarse-inicio.component';
import { NavegacionModule } from './navegacion/navegacion.module'; 
import { ReservacionesModule } from './reservaciones/reservaciones.module'; 
import { ContaInicioComponent } from './contabilidad/conta-inicio/conta-inicio.component';
import { RHInicioComponent } from './recursos-humanos/rhinicio/rhinicio.component';
import { LoginComponent } from './auths/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrarseInicioComponent,
    ContaInicioComponent,
    RHInicioComponent,
    LoginComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavegacionModule,
    ReservacionesModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    
    
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
