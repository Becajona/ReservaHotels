import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { HabitacionesService } from 'src/app/servicios/habitaciones.service';

export interface Reserva {
  id: string;
  nombreCliente: string;
  correoCliente: string;
  telefonoCliente: string;
  habitacion?: string;
  fechaLlegada?: Date;
  fechaSalida?: Date;
  estado?: string;
}

export interface Habitacion {
  numero_habitacion: string;
  tipo_habitacion: string;
  precio_noche: number;
  capacidad: number;
  sucursal_id: string;
  estado: string;
  fecha_disponible: Date;
  comodidades?: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  reservacion: {
    nombreCliente: string;
    correoCliente: string;
    telefonoCliente: string;
  } = {
    nombreCliente: '',
    correoCliente: '',
    telefonoCliente: ''
  };

  habitacion: {
    numero_habitacion: string;
    tipo_habitacion: string;
    precio_noche: number;
    capacidad: number;
    sucursal_id: string;
    estado: string;
    fecha_disponible: Date;
    comodidades: string;
  } = {
    numero_habitacion: '',
    tipo_habitacion: '',
    precio_noche: 0,
    capacidad: 0,
    sucursal_id: '',
    estado: 'disponible',
    fecha_disponible: new Date(),
    comodidades: ''
  };

  reservas: Reserva[] = [];
  habitacionesDisponibles: any[] = [];
  habitacionesFiltradas: Habitacion[] = []; // Inicializa la propiedad habitacionesFiltradas
  fechaEntrada: Date = new Date();
  fechaSalida: Date = new Date();
  capacidad: number = 0;

  constructor(private firestore: AngularFirestore, private habitacionService: HabitacionesService) { }

  ngOnInit() {
    this.cargarHabitacionesDisponibles();
    this.cargarReservas();
  }

  cargarReservas() {
    this.firestore.collection<Reserva>('reservaciones').valueChanges({ idField: 'id' }).subscribe(data => {
      this.reservas = data;
    });
  }

  cargarHabitacionesDisponibles(): void {
    this.firestore.collection<Habitacion>('habitaciones', ref => ref.where('estado', '==', 'disponible')).valueChanges().subscribe(data => {
        this.habitacionesDisponibles = data;
        this.habitacionesFiltradas = data; // Ahora TypeScript sabe que es Habitacion[]
        console.log(this.habitacionesDisponibles);
    });
}


  buscarHabitaciones(): void {
    // Filtra habitaciones basándose en los criterios de búsqueda
    this.habitacionesFiltradas = this.habitacionesDisponibles.filter(habitacion => {
      const cumpleFechaEntrada = new Date(habitacion.fecha_disponible) <= this.fechaEntrada;
      const cumpleFechaSalida = new Date(habitacion.fecha_disponible) >= this.fechaSalida;
      const cumpleCapacidad = habitacion.capacidad >= this.capacidad;

      return cumpleFechaEntrada && cumpleFechaSalida && cumpleCapacidad;
    });
  }

  onSubmitReservacionForm(form: NgForm) {
    if (form.valid) {
      this.firestore.collection('reservaciones').add({
        nombreCliente: this.reservacion.nombreCliente,
        correoCliente: this.reservacion.correoCliente,
        telefonoCliente: this.reservacion.telefonoCliente,
        timestamp: new Date()
      }).then(() => {
        alert('Reservación completada con éxito.');
        form.resetForm();
        this.cargarReservas();
      }).catch(error => {
        console.error("Error al completar la reservación: ", error);
      });
    }
  }

  onSubmitHabitacionForm(form: NgForm) {
    if (form.valid) {
      const comodidadesString = this.habitacion.comodidades || '';

      this.firestore.collection('habitaciones').add({
        numero_habitacion: this.habitacion.numero_habitacion,
        tipo_habitacion: this.habitacion.tipo_habitacion,
        precio_noche: this.habitacion.precio_noche,
        capacidad: this.habitacion.capacidad,
        sucursal_id: this.habitacion.sucursal_id,
        estado: this.habitacion.estado,
        fecha_disponible: this.habitacion.fecha_disponible,
        comodidades: comodidadesString
      }).then(() => {
        alert('Habitación agregada con éxito.');
        form.resetForm();
        this.cargarHabitacionesDisponibles();
      }).catch(error => {
        console.error("Error al agregar la habitación: ", error);
      });
    }
  }

  eliminarReserva(id: string) {
    this.firestore.collection('reservaciones').doc(id).delete().then(() => {
      alert('Reservación eliminada con éxito.');
      this.cargarReservas();
    }).catch(error => {
      console.error("Error al eliminar la reservación: ", error);
    });
  }
}
