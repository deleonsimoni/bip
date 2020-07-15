import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { OnlyAdminUsersGuard } from './admin-user-guard';
import { CadastroComponent } from './cliente/cadastro/cadastro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManterComponent } from './cliente/manter/manter.component';
import { InventarioCadastrarComponent } from './inventario/inventario-cadastrar/inventario-cadastrar.component';
import { ListarInventarioComponent } from './inventario/listar-inventario/listar-inventario.component';

import { CadastroempresaComponent } from './empresa/cadastroempresa/cadastroempresa.component';
import { ManterempresaComponent } from './empresa/manterempresa/manterempresa.component';
import { ManterfuncionarioComponent } from './funcionario/manterfuncionario/manterfuncionario.component';
import { CadastrofuncionarioComponent } from './funcionario/cadastrofuncionario/cadastrofuncionario.component';
import { SupportemployeeComponent } from './employee/supportemployee/supportemployee.component';
import { RegisteremployeeComponent } from './employee/registeremployee/registeremployee.component';
  import { from } from 'rxjs';
import { ListarCollectorComponent } from './collector/listar-collector/listar-collector.component';
import { MasterEmployeeComponent } from './masteremployee/cadastro/masteremployee.component';
import {ManterMasterEmployeeComponent} from './masteremployee/manter/manter-masteremployee.component';


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
    , { path: 'funcionariocadastro', component: CadastrofuncionarioComponent }
    , { path: 'funcionariomanter', component: ManterfuncionarioComponent }
    , { path: 'dashboard', component: DashboardComponent }
    , { path: 'inventariocadastro', component: InventarioCadastrarComponent }
    , { path: 'inventariolista', component: ListarInventarioComponent }
    , { path: 'empresacadastro', component: CadastroempresaComponent }
    , { path: 'empresamanter', component: ManterempresaComponent }
    , { path: 'registeremployee', component: RegisteremployeeComponent}
    , { path: 'supportemployee', component: SupportemployeeComponent}
    , { path: 'collector', component: ListarCollectorComponent }
    , { path: 'usuarioselecionar', component: MasterEmployeeComponent }
    , { path: 'manterusuarioselecionar', component: ManterMasterEmployeeComponent }
    
   

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }