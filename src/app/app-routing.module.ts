import { Component,NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


//Reservaciones
import { InicioComponent } from './reservaciones/inicio/inicio.component';


//check-in chech-out
import { RegistrarseInicioComponent } from './check/registrarse-inicio/registrarse-inicio.component';
import { ContaInicioComponent } from './contabilidad/conta-inicio/conta-inicio.component';
import { RHInicioComponent } from './recursos-humanos/rhinicio/rhinicio.component';
import { FacturacionInicioComponent } from './facturacion/facturacion-inicio/facturacion-inicio.component';

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
        {
          path:'rhinicio',
          component: RHInicioComponent
          },
          {
            path:'Facturacion',
            component: FacturacionInicioComponent
            },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
