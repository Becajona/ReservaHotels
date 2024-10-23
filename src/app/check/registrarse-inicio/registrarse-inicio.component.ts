import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importa Firestore
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registrarse-inicio',
  templateUrl: './registrarse-inicio.component.html',
  styleUrls: ['./registrarse-inicio.component.css']
})
export class RegistrarseInicioComponent {
  checkIn: {
    nombreHuesped: string;
    correoHuesped: string;
    fechaLlegada: string;
    tipoHabitacion: string;
  } = {
    nombreHuesped: '',
    correoHuesped: '',
    fechaLlegada: '',
    tipoHabitacion: ''
  };

  constructor(private firestore: AngularFirestore) { }

  // Método que se ejecuta al enviar el formulario de Check-in
  onCheckInSubmit(form: NgForm) {
    if (form.valid) {
      this.firestore.collection('checkIns').add({
        nombreHuesped: this.checkIn.nombreHuesped,
        correoHuesped: this.checkIn.correoHuesped,
        fechaLlegada: this.checkIn.fechaLlegada,
        tipoHabitacion: this.checkIn.tipoHabitacion,
        timestamp: new Date()
      }).then(() => {
        alert('Check-in registrado con éxito.');
        form.resetForm(); // Resetea el formulario después de la sumisión
      }).catch(error => {
        console.error("Error al registrar el Check-in: ", error);
      });
    }
  }
}
