import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importa Firestore
import { NgForm } from '@angular/forms';
import jsPDF from 'jspdf'; // Importar jsPDF

@Component({
  selector: 'app-registrarse-inicio',
  templateUrl: './registrarse-inicio.component.html',
  styleUrls: ['./registrarse-inicio.component.css']
})
export class RegistrarseInicioComponent implements OnInit {
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

  checkOut: {
    nombreHuesped: string;
    fechaSalida: string;
    cargosAdicionales: string;
  } = {
    nombreHuesped: '',
    fechaSalida: '',
    cargosAdicionales: ''
  };

  huespedes: any[] = []; // Propiedad para almacenar la lista de huéspedes
  facturacion: {
    nombreHuespedFactura: string;
    totalFactura: number;
    metodoPago: string;
  } = {
    nombreHuespedFactura: '',
    totalFactura: 0,
    metodoPago: ''
  };

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.obtenerHuespedes();
  }

  // Método para obtener la lista de huéspedes que ya han hecho check-in
  obtenerHuespedes(): void {
    this.firestore.collection('checkIns').valueChanges().subscribe((data: any[]) => {
      this.huespedes = data;
    }, error => {
      console.error("Error al obtener los huéspedes:", error);
    });
  }

  // Método para generar la factura en PDF
  generarFactura() {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('Factura', 10, 10);
    doc.text(`Nombre del Huésped: ${this.facturacion.nombreHuespedFactura}`, 10, 20);
    doc.text(`Total a Pagar: $${this.facturacion.totalFactura}`, 10, 30);
    doc.text(`Método de Pago: ${this.facturacion.metodoPago}`, 10, 40);
    doc.save('factura.pdf'); // Guarda el PDF con el nombre 'factura.pdf'
  }

  // Método que se ejecuta al enviar el formulario de Facturación
  onFacturacionSubmit(form: NgForm) {
    if (form.valid) {
      this.generarFactura(); // Genera la factura
      form.resetForm(); // Resetea el formulario después de la sumisión
      this.facturacion = { nombreHuespedFactura: '', totalFactura: 0, metodoPago: '' }; // Resetea los datos de facturación
    }
  }

  // Método que se ejecuta al enviar el formulario de Check-In
  onCheckInSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Check-in:', this.checkIn);
      this.firestore.collection('checkIns').add(this.checkIn).then(() => {
        form.resetForm();
        this.checkIn = { nombreHuesped: '', correoHuesped: '', fechaLlegada: '', tipoHabitacion: '' }; // Resetea los datos
      }).catch(error => {
        console.error("Error al realizar el check-in:", error);
      });
    }
  }

  // Método que se ejecuta al enviar el formulario de Check-Out
  onCheckOutSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Check-out:', this.checkOut);
      form.resetForm();
      this.checkOut = { nombreHuesped: '', fechaSalida: '', cargosAdicionales: '' }; // Resetea los datos
    }
  }

  // Método que se ejecuta al enviar el formulario de Asignación de Habitación
  onAsignacionSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Asignación de habitación:', this.checkIn.tipoHabitacion);
      form.resetForm();
    }
  }
}
