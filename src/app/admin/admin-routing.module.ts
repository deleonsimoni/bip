import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { OnlyAdminUsersGuard } from './admin-user-guard';
import { CadastroComponent } from './cliente/cadastro/cadastro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManterComponent } from './cliente/manter/manter.component';
import { InventarioCadastrarComponent } from './inventario/inventario-cadastrar/inventario-cadastrar.component';
import { ListarInventarioComponent } from './inventario/listar-inventario/listar-inventario.component';

import { FuncionarioCadastrarComponent } from './funcionario/funcionario-cadastrar/funcionario-cadastrar.component';
import { FuncionarioListarComponent } from './funcionario/funcionario-listar/funcionario-listar.component';
import { EmpresaManterComponent } from './empresa/empresa-manter/empresa-manter.component';


const routes: Routes = [{
  path: 'admin',
  component: AdminComponent,
  //canActivate: [OnlyAdminUsersGuard],
  children: [{
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
    , { path: 'clientecadastro', component: CadastroComponent }
    , { path: 'clientemanter', component: ManterComponent }
    , { path: 'dashboard', component: DashboardComponent }
    , { path: 'inventariocadastro', component: InventarioCadastrarComponent }
    , { path: 'inventariolista', component: ListarInventarioComponent }
    , { path: 'funcionarioCadastro', component: FuncionarioCadastrarComponent }
    , { path: 'funcionarioLista', component: FuncionarioListarComponent }
    , { path: 'empresa', component: EmpresaManterComponent }

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }