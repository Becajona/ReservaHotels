import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { InicioComponent } from '../reservaciones/inicio/inicio.component';

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {

  constructor(private firestore: AngularFirestore) {}


  // Obtener habitaciones disponibles
  getHabitacionesDisponibles(): Observable<InicioComponent[]> {
    return this.firestore.collection<InicioComponent>('habitaciones', ref => ref.where('estado', '==', 'disponible')).valueChanges({ idField: 'id' });
  }
}
