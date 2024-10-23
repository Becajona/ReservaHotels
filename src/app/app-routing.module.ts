import { Component,NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


//Reservaciones
import { InicioComponent } from './reservaciones/inicio/inicio.component';


//check-in chech-out
import { RegistrarseInicioComponent } from './check/registrarse-inicio/registrarse-inicio.component';
import { ContaInicioComponent } from './contabilidad/conta-inicio/conta-inicio.component';

const routes: Routes = [
  {
    path:'inicio',
    component: InicioComponent
    },
    {
      path:'registrarse',
      component: RegistrarseInicioComponent
      },
      {
        path:'contabilidad',
        component: ContaInicioComponent
        },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
