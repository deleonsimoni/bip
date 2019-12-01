import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { OnlyAdminUsersGuard } from './admin-user-guard';
import { CadastroComponent } from './cliente/cadastro/cadastro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManterComponent } from './cliente/manter/manter.component';

const routes: Routes = [{
  path: 'admin',
  component: AdminComponent,
  //canActivate: [OnlyAdminUsersGuard],
  children: [{
    path: '',
    redirectTo: 'admin/dashboard',
    pathMatch: 'full'
  }
  ,{ path: 'clientecadastro', component: CadastroComponent }
  ,{ path: 'clientemanter', component: ManterComponent }
  ,{ path: 'dashboard', component: DashboardComponent }
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {}