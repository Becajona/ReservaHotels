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
  checkIn = {
    nombreHuesped: '',
    correoHuesped: '',
    fechaLlegada: '',
    tipoHabitacion: '',
    telefono: '',
    direccion: '',
    documento: '',
    fechaNacimiento: '',
    nacionalidad: '',
    emergencia: '',
    numeroReserva: '',
    fechaSalida: '',
    numPersonas: 0,
    horaLlegada: '',
    metodoCheckin: '',
    metodoPago: '',
    datosTarjeta: '', // Nuevo campo (opcional)
    confirmacionPago: ''
  };

  checkOut = {
    nombreHuesped: '',
    fechaSalida: '',
    cargosAdicionales: ''
  };

  huespedes: any[] = []; // Propiedad para almacenar la lista de huéspedes
  facturacion = {
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

      // Guardar los datos del Check-In en Firestore
      this.firestore.collection('checkIns').add(this.checkIn).then(() => {
        this.generarPDF(this.checkIn); // Genera PDF del check-in
        form.resetForm();
        this.checkIn = { 
          nombreHuesped: '', 
          correoHuesped: '', 
          fechaLlegada: '', 
          tipoHabitacion: '', 
          telefono: '', 
          direccion: '', 
          documento: '', 
          fechaNacimiento: '', 
          nacionalidad: '', 
          emergencia: '', 
          numeroReserva: '', 
          fechaSalida: '', 
          numPersonas: 0, 
          horaLlegada: '', 
          metodoCheckin: '', 
          metodoPago: '', 
          confirmacionPago: '',
          datosTarjeta: ''
        }; // Resetea los datos
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

  // Método para generar el PDF del check-in
  generarPDF(data: any) {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('Registro de Llegada', 10, 10);
    doc.text(`Nombre: ${data.nombreHuesped}`, 10, 20);
    doc.text(`Correo: ${data.correoHuesped}`, 10, 30);
    doc.text(`Teléfono: ${data.telefono}`, 10, 40);
    doc.text(`Dirección: ${data.direccion}`, 10, 50);
    doc.text(`Documento: ${data.documento}`, 10, 60);
    doc.text(`Fecha de Nacimiento: ${data.fechaNacimiento}`, 10, 70);
    doc.text(`Nacionalidad: ${data.nacionalidad}`, 10, 80);
    doc.text(`Contacto de Emergencia: ${data.emergencia}`, 10, 90);
    doc.text(`Número de Reserva: ${data.numeroReserva}`, 10, 100);
    doc.text(`Fecha de Llegada: ${data.fechaLlegada}`, 10, 110);
    doc.text(`Fecha de Salida: ${data.fechaSalida}`, 10, 120);
    doc.text(`Número de Personas: ${data.numPersonas}`, 10, 130);
    doc.text(`Tipo de Habitación: ${data.tipoHabitacion}`, 10, 140);
    doc.text(`Hora de Llegada: ${data.horaLlegada}`, 10, 150);
    doc.text(`Método de Check-in: ${data.metodoCheckin}`, 10, 160);
    doc.text(`Método de Pago: ${data.metodoPago}`, 10, 170);
    doc.text(`Confirmación de Pago: ${data.confirmacionPago}`, 10, 180);
    doc.save('registro-llegada.pdf'); // Guarda el PDF con el nombre 'registro-llegada.pdf'
  }
}
