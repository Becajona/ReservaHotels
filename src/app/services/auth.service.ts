import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) {}

  /**
   * Método para iniciar sesión y obtener el rol del usuario.
   * @param email Correo electrónico del usuario.
   * @param password Contraseña del usuario.
   * @returns Un objeto con el email y rol del usuario, o `null` si no existe.
   */
  async login(email: string, password: string): Promise<{ email: string; rol: string } | null> {
    try {
      const result = await this.auth.signInWithEmailAndPassword(email, password);
      const user = result.user;

      if (user) {
        const userDoc = await firstValueFrom(
          this.firestore.collection('usuarios').doc(user.uid).valueChanges()
        );

        if (userDoc) {
          const rol = (userDoc as any).rol;
          // Almacenar el rol en localStorage
          localStorage.setItem('userRole', rol);
          return { email: user.email || '', rol };
        }
      }

      return null;
    } catch (error) {
      console.error('Error en login:', error);
      throw new Error('Credenciales incorrectas o error en el servidor.');
    }
  }

  /**
   * Método para obtener el rol del usuario actualmente autenticado.
   * @returns El rol del usuario o `null` si no está autenticado.
   */
  async getUserRole(): Promise<string | null> {
    const userRole = localStorage.getItem('userRole'); // Obtener el rol desde localStorage

    if (userRole) {
      return userRole; // Si existe el rol, devolverlo
    }

    // Si no hay rol en localStorage, verificar si hay un usuario autenticado
    const user = await this.auth.currentUser;
    if (!user) {
      console.error('No se encontró un usuario autenticado.');
      return null;
    }

    try {
      const userDoc = await firstValueFrom(
        this.firestore.collection('usuarios').doc(user.uid).valueChanges()
      );
      if (userDoc) {
        const rol = (userDoc as any).rol;
        // Almacenar el rol en localStorage para futuras consultas
        localStorage.setItem('userRole', rol);
        return rol;
      }
    } catch (error) {
      console.error('Error al obtener el rol del usuario:', error);
      return null;
    }

    return null; // En caso de no encontrar el rol
  }

  /**
   * Método para registrar un nuevo usuario con un rol especificado.
   * @param email Correo electrónico del usuario.
   * @param password Contraseña del usuario.
   * @param rol Rol del usuario (por ejemplo, 'admin', 'empleado').
   */
  async register(email: string, password: string, rol: string): Promise<void> {
    try {
      const result = await this.auth.createUserWithEmailAndPassword(email, password);
      if (result.user) {
        const uid = result.user.uid;
        await this.firestore.collection('usuarios').doc(uid).set({ email, rol });
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      throw error;
    }
  }

  /**
   * Método para cerrar sesión del usuario actual.
   */
  async logout(): Promise<void> {
    try {
      await this.auth.signOut();
      localStorage.removeItem('userRole'); // Eliminar el rol del almacenamiento
      console.log('Sesión cerrada exitosamente.');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
