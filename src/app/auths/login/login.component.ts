import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rol: string = '';
  isRegistering: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleRegistering() {
    this.isRegistering = !this.isRegistering;
    this.email = '';
    this.password = '';
    this.rol = '';
  }

  // Método para iniciar sesión
  async onLogin() {
    if (!this.email || !this.password || !this.rol) {
      alert('Por favor complete todos los campos');
      return;
    }

    try {
      console.log("Intentando iniciar sesión con:", this.email, "y rol:", this.rol);

      // Inicia sesión y recupera el rol del usuario desde Firestore
      const result = await this.authService.login(this.email, this.password);
      if (!result) {
        alert('Error: No se pudo autenticar al usuario.');
        return;
      }

      console.log("Datos del usuario autenticado:", result);

      // Comparar el rol ingresado con el almacenado en la base de datos
      if (result.rol === this.rol) {
        console.log("Rol válido, redireccionando...");
        // Redirigir según el rol
        this.router.navigate([this.rol === 'admin' ? '/rhinicio' : '/inicio']);
      } else {
        console.error("Rol incorrecto proporcionado por el usuario:", this.rol);
        alert('Credenciales inválidas o rol incorrecto.');
      }
    } catch (error: any) {
      console.error("Error al intentar iniciar sesión:", error);
      if (error.code === 'auth/user-not-found') {
        alert('Usuario no encontrado.');
      } else if (error.code === 'auth/wrong-password') {
        alert('Contraseña incorrecta.');
      } else if (error.code === 'auth/invalid-email') {
        alert('Correo electrónico inválido.');
      } else {
        alert('Error desconocido: ' + error.message);
      }
    }
  }

  // Método para registrar un nuevo usuario
  async onRegister() {
    if (!this.email || !this.password || !this.rol) {
      alert('Por favor complete todos los campos');
      return;
    }

    try {
      const result = await this.authService.register(this.email, this.password, this.rol);
      alert('Usuario registrado con éxito');
      this.toggleRegistering(); // Cambiar al modo de inicio de sesión
    } catch (error: any) {
      alert('Error al registrar: ' + error.message);
    }
  }
}
