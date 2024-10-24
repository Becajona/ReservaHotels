import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Firestore de Firebase
import { NgForm } from '@angular/forms';
import { HabitacionesService } from 'src/app/servicios/habitaciones.service';

// Definición de la estructura de datos de una reserva
export interface Reserva {
  id: string; // Opcional para poder usarlo en Firestore
  nombreCliente: string;
  correoCliente: string;
  telefonoCliente: string;
  habitacion?: string; // Si necesitas este campo
  fechaLlegada?: Date; // Si necesitas este campo
  fechaSalida?: Date; // Si necesitas este campo
  estado?: string; // Si necesitas este campo
}

// Definición de la estructura de datos de una habitación
export interface Habitacion {
  numero_habitacion: string;
  tipo_habitacion: string;
  precio_noche: number;
  capacidad: number;
  sucursal_id: string;
  estado: string;
  fecha_disponible: Date;
  comodidades?: string; // Asegúrate de que sea string
}


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  reservacion: { // Para el formulario de reserva de habitaciones
    nombreCliente: string;
    correoCliente: string;
    telefonoCliente: string;
  } = {
    nombreCliente: '',
    correoCliente: '',
    telefonoCliente: ''
  };

  habitacion: { // Para el formulario de nueva habitación
    numero_habitacion: string;
    tipo_habitacion: string;
    precio_noche: number;
    capacidad: number;
    sucursal_id: string;
    estado: string;
    fecha_disponible: Date;
    comodidades: string; // Cambiado a string
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


// Método para cargar las habitaciones desde Firestore
  cargarHabitacionesDisponibles(): void {
    this.firestore.collection('habitaciones', ref => ref.where('estado', '==', 'disponible')).valueChanges().subscribe(data => {
      this.habitacionesDisponibles = data;
      console.log(this.habitacionesDisponibles); // Para depurar y ver los datos
    });
  }


  // Método para enviar el formulario de reservación
  onSubmitReservacionForm(form: NgForm) {
    if (form.valid) {
      // Lógica para manejar el envío del formulario de reservación
      this.firestore.collection('reservaciones').add({
        nombreCliente: this.reservacion.nombreCliente,
        correoCliente: this.reservacion.correoCliente,
        telefonoCliente: this.reservacion.telefonoCliente,
        timestamp: new Date()
      }).then(() => {
        alert('Reservación completada con éxito.');
        form.resetForm(); // Resetea el formulario tras el envío exitoso
        this.cargarReservas(); // Recarga las reservas
      }).catch(error => {
        console.error("Error al completar la reservación: ", error);
      });
    }
  }

  
  // Método para enviar el formulario de habitación
  
  // Método para enviar el formulario de habitación
  onSubmitHabitacionForm(form: NgForm) {
    if (form.valid) {
      // No es necesario convertir comodidades, ya que ahora es un string
      const comodidadesString = this.habitacion.comodidades || '';
      
      this.firestore.collection('habitaciones').add({
        numero_habitacion: this.habitacion.numero_habitacion,
        tipo_habitacion: this.habitacion.tipo_habitacion,
        precio_noche: this.habitacion.precio_noche,
        capacidad: this.habitacion.capacidad,
        sucursal_id: this.habitacion.sucursal_id,
        estado: this.habitacion.estado,
        fecha_disponible: this.habitacion.fecha_disponible,
        comodidades: comodidadesString // Guardar como string
      }).then(() => {
        alert('Habitación agregada con éxito.');
        form.resetForm();
        this.cargarHabitacionesDisponibles(); // Recargar las habitaciones disponibles
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
