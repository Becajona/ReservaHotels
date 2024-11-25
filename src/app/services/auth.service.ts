import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) {}

  // Método para login
  // Método para login con obtención de rol
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
          return { email: user.email || '', rol };
        }
      }
  
      return null;
    } catch (error) {
      console.error('Error en login:', error);
      throw new Error('Credenciales incorrectas o error en el servidor.');
    }
  }
  


  // Obtener rol del usuario actual
  async getUserRole(): Promise<string | null> {
    const user = await this.auth.currentUser;
    if (!user) {
      console.error("No se encontró un usuario autenticado.");
      return null;
    }
  
    try {
      const userDoc = await firstValueFrom(this.firestore.collection('usuarios').doc(user.uid).valueChanges());
      console.log("Documento del usuario obtenido desde Firestore:", userDoc);
      return userDoc ? (userDoc as any).rol : null;
    } catch (error) {
      console.error("Error al obtener el rol del usuario:", error);
      return null;
    }
  }
  //Registro de usuario
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
  
  
}
