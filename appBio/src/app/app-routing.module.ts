import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { FacturaComponent } from './factura/factura.component';


const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'factura' ,  component :FacturaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
