import { Component,NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


//Reservaciones
import { InicioComponent } from './reservaciones/inicio/inicio.component';


//check-in chech-out
import { RegistrarseInicioComponent } from './check/registrarse-inicio/registrarse-inicio.component';
import { ContaInicioComponent } from './contabilidad/conta-inicio/conta-inicio.component';
import { RHInicioComponent } from './recursos-humanos/rhinicio/rhinicio.component';
import { FacturacionInicioComponent } from './facturacion/facturacion-inicio/facturacion-inicio.component';
import { HabitacionesComponent } from './tipode-habitacion/habitaciones/habitaciones.component';
import { SucursalesInicioComponent } from './sucursales/sucursales-inicio/sucursales-inicio.component';

import { LoginComponent } from './auths/login/login.component';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'inicio',
    component: InicioComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'empleado'] }
  },
  { 
    path: 'registrarse',
    component: RegistrarseInicioComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'empleado'] }
  },
  { 
    path: 'contabilidad',
    component: ContaInicioComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  { 
    path: 'rhinicio',
    component: RHInicioComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  { 
    path: 'Facturacion',
    component: FacturacionInicioComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'empleado'] }
  },
  { 
    path: 'habitaciones',
    component: HabitacionesComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'empleado'] }
  },
  { 
    path: 'sucursales',
    component: SucursalesInicioComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
