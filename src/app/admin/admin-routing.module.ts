import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { OnlyAdminUsersGuard } from './admin-user-guard';
import { CadastroComponent } from './cliente/cadastro/cadastro.component';

const routes: Routes = [{
  path: 'admin',
 // canActivate: [OnlyAdminUsersGuard],
  children: [{
    path: '',
    component: AdminComponent,
  },{
    path: 'clientecadastro',
    component: CadastroComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {}
