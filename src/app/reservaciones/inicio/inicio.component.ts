import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Firestore de Firebase
import { NgForm } from '@angular/forms';

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

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  reservacion: { // Para el formulario
    nombreCliente: string;
    correoCliente: string;
    telefonoCliente: string;
  } = {
    nombreCliente: '',
    correoCliente: '',
    telefonoCliente: ''
  };

  reservas: Reserva[] = []; // Para almacenar las reservas

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
    this.cargarReservas(); // Cargar reservas al iniciar el componente
  }

  cargarReservas() {
    // Aquí obtienes las reservas de Firestore
    this.firestore.collection<Reserva>('reservaciones').valueChanges({ idField: 'id' }).subscribe(data => {
      this.reservas = data;
    });
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.firestore.collection('reservaciones').add({
        nombreCliente: this.reservacion.nombreCliente,
        correoCliente: this.reservacion.correoCliente,
        telefonoCliente: this.reservacion.telefonoCliente,
        timestamp: new Date()
      }).then(() => {
        alert('Reservación completada con éxito.');
        form.resetForm();
        this.cargarReservas(); // Recargar las reservas después de añadir una
      }).catch(error => {
        console.error("Error al completar la reservación: ", error);
      });
    }
  }

  eliminarReserva(id: string) {
    // Aquí eliminamos la reserva usando su ID
    this.firestore.collection('reservaciones').doc(id).delete().then(() => {
      alert('Reservación eliminada con éxito.');
      this.cargarReservas(); // Recargar las reservas después de eliminar
    }).catch(error => {
      console.error("Error al eliminar la reservación: ", error);
    });
  }
}
