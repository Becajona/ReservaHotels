import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userRole: string | null = null;
  isLoading: boolean = true; // Para manejar el estado de carga

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    try {
      // Obtener el rol del usuario al inicializar el componente
      this.userRole = await this.authService.getUserRole();
      console.log('Rol del usuario actual:', this.userRole);
    } catch (error) {
      console.error('Error al obtener el rol del usuario:', error);
      this.userRole = null; // Establecer el rol como null si ocurre un error
    } finally {
      this.isLoading = false; // Termina el estado de carga
    }
  }

  // Método para cerrar sesión
  async logout() {
    try {
      await this.authService.logout();
      console.log('Sesión cerrada exitosamente.');
      this.router.navigate(['/login']); // Redirige al login
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  // Método para mostrar el rol del usuario en consola (opcional)
  logUserRole(): void {
    console.log(this.userRole);
  }
}
