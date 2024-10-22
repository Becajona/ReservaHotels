import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';

import { InicioComponent } from '../reservaciones/inicio/inicio.component';
import { RegistrarseInicioComponent } from '../check/registrarse-inicio/registrarse-inicio.component';


@NgModule({
  declarations: [
    MenuComponent,
    InicioComponent
    
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MenuComponent,
    InicioComponent,
    ] 

})
export class NavegacionModule { }
