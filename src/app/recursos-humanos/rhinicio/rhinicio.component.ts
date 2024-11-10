import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-rhinicio',
  templateUrl: './rhinicio.component.html',
  styleUrls: ['./rhinicio.component.css']
})
export class RHInicioComponent implements OnInit {
  empleado = {
    id: 0,
    nombre: '',
    apellido: '',
    correo: '',
    puesto: '',
    turno: 'Matutino',
    telefono: '',
    direccion: '',
    activo: false
  };

  // Variables para los datos del formulario de evaluación
  empleadoIdEvaluacion: string = '';
  comentariosEvaluacion: string = '';

  // Variables para los datos del turno
  empleadoId: number = 0;
  fechaTurno: string = '';
  turno: string = 'Matutino';

  // Variables para el registro de asistencia
  empleadoIdAsistencia: string = '';
  fechaAsistencia: string = '';
  horaEntrada: string = '';
  horaSalida: string = '';
  ausencias: number = 0;
  retardos: number = 0;

  // Lista de empleados para el select
  empleados: any[] = [];

  // Lista de asistencias para mostrar en la tabla
  asistencias: any[] = [];

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.cargarEmpleados();
    this.cargarAsistencias();
  }

  // Método para cargar los empleados desde Firebase
  cargarEmpleados(): void {
    this.firestore.collection('empleados').valueChanges({ idField: 'id' }).subscribe((data: any[]) => {
      this.empleados = data;
    });
  }

  // Método para cargar las asistencias desde Firebase
  cargarAsistencias(): void {
    this.firestore.collection('asistencias').valueChanges({ idField: 'id' }).subscribe((data: any[]) => {
      this.asistencias = data;
    });
  }

  // Método para registrar la asistencia en Firebase
  registrarAsistencia(): void {
    if (!this.empleadoIdAsistencia || !this.fechaAsistencia || !this.horaEntrada || !this.horaSalida) {
      alert("Por favor, completa todos los campos antes de enviar.");
      return;
    }

    this.firestore.collection('asistencias').add({
      empleadoId: this.empleadoIdAsistencia,
      fechaAsistencia: this.fechaAsistencia,
      horaEntrada: this.horaEntrada,
      horaSalida: this.horaSalida,
      ausencias: this.ausencias,
      retardos: this.retardos
    }).then(() => {
      console.log('Asistencia registrada con éxito');
      alert("Asistencia registrada con éxito");
      this.limpiarCamposAsistencia();
    }).catch(error => {
      console.error("Error al registrar la asistencia:", error);
    });
  }

  // Método para enviar los datos del turno a Firebase
  programarTurno(): void {
    if (!this.empleadoId || !this.fechaTurno || !this.turno) {
      alert("Por favor, completa todos los campos antes de enviar.");
      return;
    }

    this.firestore.collection('turnos').add({
      empleadoId: this.empleadoId,
      fechaTurno: this.fechaTurno,
      turno: this.turno
    }).then(() => {
      console.log('Turno programado con éxito');
      alert("Turno programado con éxito");
      this.limpiarCamposTurno();
    }).catch(error => {
      console.error("Error al programar el turno:", error);
    });
  }

  // Método para registrar el empleado
  registrarEmpleado(): void {
    if (!this.empleado.id || !this.empleado.nombre || !this.empleado.apellido || !this.empleado.correo || !this.empleado.puesto || !this.empleado.turno || !this.empleado.telefono || !this.empleado.direccion) {
      alert("Por favor, completa todos los campos antes de enviar.");
      return;
    }

    this.firestore.collection('empleados').add({
      id: this.empleado.id,
      nombre: this.empleado.nombre,
      apellido: this.empleado.apellido,
      correo: this.empleado.correo,
      puesto: this.empleado.puesto,
      turno: this.empleado.turno,
      telefono: this.empleado.telefono,
      direccion: this.empleado.direccion,
      activo: this.empleado.activo
    }).then(() => {
      console.log('Empleado registrado con éxito');
      alert("Empleado registrado con éxito");
      this.resetForm();
    }).catch(error => {
      console.error("Error al registrar el empleado:", error);
    });
  }

  // Método para registrar la evaluación en Firebase
  registrarEvaluacion(): void {
    if (!this.empleadoIdEvaluacion || !this.comentariosEvaluacion) {
      alert("Por favor, completa todos los campos antes de enviar.");
      return;
    }

    this.firestore.collection('evaluaciones').add({
      empleadoId: this.empleadoIdEvaluacion,
      comentariosEvaluacion: this.comentariosEvaluacion,
      fechaEvaluacion: new Date() // Fecha actual de la evaluación
    }).then(() => {
      console.log('Evaluación registrada con éxito');
      alert("Evaluación registrada con éxito");
      this.empleadoIdEvaluacion = '';
      this.comentariosEvaluacion = '';
    }).catch(error => {
      console.error("Error al registrar la evaluación:", error);
    });
  }

  // Método para limpiar los campos de la asistencia
  limpiarCamposAsistencia(): void {
    this.empleadoIdAsistencia = '';
    this.fechaAsistencia = '';
    this.horaEntrada = '';
    this.horaSalida = '';
    this.ausencias = 0;
    this.retardos = 0;
  }

  // Método para limpiar los campos del turno
  limpiarCamposTurno(): void {
    this.empleadoId = 0;
    this.fechaTurno = '';
    this.turno = 'Matutino';
  }

  // Método para resetear los campos del formulario
  resetForm(): void {
    this.empleado = {
      id: 0,
      nombre: '',
      apellido: '',
      correo: '',
      puesto: '',
      turno: 'Matutino',
      telefono: '',
      direccion: '',
      activo: false
    };
    this.empleadoId = 0;
    this.fechaTurno = '';
    this.turno = 'Matutino';
    this.empleadoIdEvaluacion = '';
    this.comentariosEvaluacion = '';
  }
}
