import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { InicioComponent } from './inicio/inicio.component';

@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    FormsModule // Añadir FormsModule aquí
  ],
  exports: [
    InicioComponent
  ]
})
export class ReservacionesModule { }
