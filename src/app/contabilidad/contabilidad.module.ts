import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContaInicioComponent } from './conta-inicio/conta-inicio.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importa Firestore


@NgModule({
  declarations: [
  
    ContaInicioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContaInicioComponent,
    AngularFirestore
  ]
})
export class ContabilidadModule { }
