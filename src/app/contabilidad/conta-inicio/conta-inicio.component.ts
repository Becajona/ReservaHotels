import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms'; // Importa NgForm aquí
import jsPDF from 'jspdf';

@Component({
  selector: 'app-conta-inicio',
  templateUrl: './conta-inicio.component.html',
  styleUrls: ['./conta-inicio.component.css']
})
export class ContaInicioComponent implements OnInit {
  transacciones: any[] = []; // Para almacenar transacciones

  // Modelo para una transacción
  transaccion = {
    tipo: '',
    fecha: '',
    monto: 0,
    descripcion: '',
    sucursal: ''
  };

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.obtenerTransacciones();
  }

  // Obtener transacciones de Firestore
  obtenerTransacciones(): void {
    this.firestore.collection('transacciones').valueChanges().subscribe((data: any[]) => {
      this.transacciones = data;
    }, error => {
      console.error("Error al obtener las transacciones:", error);
    });
  }

  // Método para registrar una transacción
  registrarTransaccion(form: NgForm): void { // Cambiar a NgForm
    if (form.valid) {
      this.firestore.collection('transacciones').add(this.transaccion).then(() => {
        console.log('Transacción registrada:', this.transaccion);
        this.transaccion = { tipo: '', fecha: '', monto: 0, descripcion: '', sucursal: '' }; // Resetea los datos
        form.reset(); // Resetea el formulario
        this.obtenerTransacciones(); // Actualiza la lista de transacciones
      }).catch(error => {
        console.error("Error al registrar la transacción:", error);
      });
    }
  }

  // Exportar a PDF
  exportarPDF(): void {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('Historial de Transacciones', 10, 10);
    
    this.transacciones.forEach((transaccion, index) => {
      doc.text(`Fecha: ${transaccion.fecha}, Tipo: ${transaccion.tipo}, Monto: $${transaccion.monto}, Descripción: ${transaccion.descripcion}, Sucursal: ${transaccion.sucursal}`, 10, 20 + (index * 10));
    });

    doc.save('transacciones.pdf');
  }

  // Exportar a Excel
  exportarExcel(): void {
    const csvData = this.transacciones.map(transaccion => {
      return `${transaccion.fecha},${transaccion.tipo},${transaccion.monto},${transaccion.descripcion},${transaccion.sucursal}`;
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + csvData.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'transacciones.csv');
    document.body.appendChild(link);
    link.click();
  }
}
