import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';

import { RegistrarseInicioComponent } from '../check/registrarse-inicio/registrarse-inicio.component';


@NgModule({
  declarations: [
    MenuComponent,
    
    
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MenuComponent,
    
    ] 

})
export class NavegacionModule { }
