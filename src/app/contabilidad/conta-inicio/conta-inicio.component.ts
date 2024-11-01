import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-conta-inicio',
  templateUrl: './conta-inicio.component.html',
  styleUrls: ['./conta-inicio.component.css']
})
export class ContaInicioComponent implements OnInit {
  transacciones: any[] = []; // Para almacenar transacciones
  tipoReporte: string = '';    // Tipo de reporte seleccionado
  periodoReporte: string = ''; // Periodo seleccionado para el reporte
  formatoExportacion: string = ''; // Agregar la propiedad formatoExportacion

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

  // Generar reporte
  generarReporte(): void {
    if (this.tipoReporte && this.periodoReporte) {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;

      // Título del reporte
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text(`Reporte Financiero - ${this.tipoReporte}`, pageWidth / 2, 15, { align: "center" });
      
      // Subtítulo con el período del reporte
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Período: ${this.periodoReporte}`, pageWidth / 2, 23, { align: "center" });

      // Encabezados de la tabla
      const headers = ["Fecha", "Tipo", "Monto", "Descripción", "Sucursal"];
      let startY = 30;
      let rowHeight = 8;

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      headers.forEach((header, index) => {
        doc.text(header, 10 + index * 40, startY);
      });

      // Datos de las transacciones
      doc.setFont("helvetica", "normal");
      this.transacciones.forEach((transaccion, index) => {
        const rowY = startY + (index + 1) * rowHeight;
        
        doc.text(transaccion.fecha, 10, rowY);
        doc.text(transaccion.tipo, 50, rowY);
        doc.text(`$${transaccion.monto}`, 90, rowY);
        doc.text(transaccion.descripcion, 130, rowY);
        doc.text(transaccion.sucursal, 170, rowY);
      });

      // Guardar el documento PDF
      doc.save(`reporte_${this.tipoReporte}_${this.periodoReporte}.pdf`);
    } else {
      alert('Por favor, selecciona el tipo de reporte y el periodo.');
    }
  }

  // Método para registrar una transacción
  registrarTransaccion(form: NgForm): void {
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
    const pageWidth = doc.internal.pageSize.width;

    // Título
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Historial de Transacciones", pageWidth / 2, 15, { align: "center" });

    // Subtítulo
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Reporte de todas las transacciones registradas", pageWidth / 2, 23, { align: "center" });

    // Encabezados de la tabla
    const headers = ["Fecha", "Tipo", "Monto", "Descripción", "Sucursal"];
    let startY = 30;
    let rowHeight = 8;

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    headers.forEach((header, index) => {
        doc.text(header, 10 + index * 40, startY);
    });

    // Datos de las transacciones
    doc.setFont("helvetica", "normal");
    this.transacciones.forEach((transaccion, index) => {
        const rowY = startY + (index + 1) * rowHeight;

        doc.text(transaccion.fecha, 10, rowY);
        doc.text(transaccion.tipo, 50, rowY);
        doc.text(`$${transaccion.monto}`, 90, rowY);
        doc.text(transaccion.descripcion, 130, rowY);
        doc.text(transaccion.sucursal, 170, rowY);
    });

    // Opciones de guardado
    doc.save("transacciones.pdf");
  }

  // Exportar a Excel
  exportarExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.transacciones);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transacciones');
    XLSX.writeFile(workbook, 'transacciones.xlsx');
  }

  // Método para exportar informe
  exportarInforme(): void {
    // Implementar la lógica para exportar el informe según el formato seleccionado
    console.log(`Exportando informe en formato: ${this.formatoExportacion}`);
  }
}
