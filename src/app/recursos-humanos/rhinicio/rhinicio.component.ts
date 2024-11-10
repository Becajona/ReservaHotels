import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-rhinicio',
  templateUrl: './rhinicio.component.html',
  styleUrls: ['./rhinicio.component.css']
})
export class RHInicioComponent implements OnInit {
  // Variables para los datos del formulario
  empleadoId: number = 0;
  fechaTurno: string = '';
  turno: string = 'Matutino';

  // Variables para el registro de asistencia
  empleadoIdAsistencia: string = '';
  fechaAsistencia: string = '';

  // Lista de empleados para el select
  empleados: any[] = [];

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  // Método para cargar los empleados desde Firebase
  cargarEmpleados(): void {
    this.firestore.collection('turnos').valueChanges({ idField: 'id' }).subscribe((data: any[]) => {
      this.empleados = data;
    });
  }

  // Método para registrar la asistencia en Firebase
  registrarAsistencia(): void {
    if (!this.empleadoIdAsistencia || !this.fechaAsistencia) {
      alert("Por favor, completa todos los campos antes de enviar.");
      return;
    }

    // Lógica para enviar los datos de asistencia a Firestore
    this.firestore.collection('asistencias').add({
      empleadoId: this.empleadoIdAsistencia,
      fechaAsistencia: this.fechaAsistencia
    }).then(() => {
      console.log('Asistencia registrada con éxito');
      alert("Asistencia registrada con éxito");
      // Limpiar campos después de registrar
      this.empleadoIdAsistencia = '';
      this.fechaAsistencia = '';
    }).catch(error => {
      console.error("Error al registrar la asistencia:", error);
    });
  }

  // Método para enviar los datos del turno a Firebase
  programarTurno(): void {
    console.log('Empleado ID:', this.empleadoId);
    console.log('Fecha Turno:', this.fechaTurno);
    console.log('Turno:', this.turno);

    if (!this.empleadoId || !this.fechaTurno || !this.turno) {
      alert("Por favor, completa todos los campos antes de enviar.");
      return;
    }

    // Lógica para enviar los datos de turnos a Firestore
    this.firestore.collection('turnos').add({
      empleadoId: this.empleadoId,
      fechaTurno: this.fechaTurno,
      turno: this.turno
    }).then(() => {
      console.log('Turno programado con éxito');
      alert("Turno programado con éxito");
      // Limpia los campos después de enviar
      this.empleadoId = 0;
      this.fechaTurno = '';
      this.turno = 'Matutino';
    }).catch(error => {
      console.error("Error al programar el turno:", error);
    });
  }

  // Método para resetear los campos del formulario
  resetForm(): void {
    this.empleadoId = 0;
    this.fechaTurno = '';
    this.turno = 'Matutino';
  }
}
